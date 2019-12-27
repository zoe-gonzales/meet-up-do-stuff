package api

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
	"golang.org/x/crypto/bcrypt"
)

// AuthenticateUser authenticates the user and logs them in correct credentials are provided
func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	// read request body & unmarshal into user struct
	var u user.User
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("%v", err)
	}
	unmarshalErr := json.Unmarshal(body, &u)
	if unmarshalErr != nil {
		log.Printf("%v", unmarshalErr)
	}
	// retrieve user & convert passwords to []byte
	us := user.Get(u.Email)
	new := []byte(u.Password)  // pwd from request body
	old := []byte(us.Password) // pwd from db

	// use CompareHashAndPassword from bcyrpt package
	hashed := bcrypt.CompareHashAndPassword(old, new)
	if hashed != nil {
		log.Printf("%v", hashed)
	}

	cookie := auth.SetCookieHandler(w, r)
	http.SetCookie(w, cookie)

	// Create new auth user & generate a remember token
	_, authErr := auth.NewAuthUser(us)
	if authErr != nil {
		log.Printf("%v", authErr)
	}
	generated := auth.GenerateToken(w, r)
	if generated != nil {
		log.Printf("%v", generated)
	}
	// Authenticate user with authboss library
	authenticated := auth.AuthenticateUser(w, &r)
	if authenticated != nil {
		log.Printf("%v", authenticated)
	}
	// retrieve profile on user's account & marshal to JSON
	profile := us.GetProfile()
	profileJSON, profileJSONErr := json.Marshal(profile)
	if profileJSONErr != nil {
		log.Printf("%v", profileJSONErr)
	}
	// Write app/json header and send profile data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(profileJSON)
}

// RegisterNewUser creates a new user in the db with provided credentials
func RegisterNewUser(w http.ResponseWriter, r *http.Request) {
	// read body for user data
	var newUser user.User
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("%v", err)
	}
	// unmarshal data into struct
	unmarshalErr := json.Unmarshal(body, &newUser)
	if unmarshalErr != nil {
		log.Printf("%v", unmarshalErr)
	}
	// Hash user password and create user
	u := newUser.HashPwd()
	u.DateJoined = time.Now()
	u.Verified = false
	q := u.Create()
	if q.RowsAffected != int64(1) {
		log.Printf("%v", errors.New("Error: Unable to create user"))
	}
	// Retrieve user and create an empty profile linked by UserID
	myUser := user.Get(newUser.Email)
	s := myUser.CreateEmptyProfile()

	if s.RowsAffected != int64(1) {
		log.Printf("%v", errors.New("Error: Unable to add profile to user's account"))
	}
	// Create new auth user using current user's data
	_, authErr := auth.NewAuthUser(myUser)
	if authErr != nil {
		log.Printf("%v", authErr)
	}
	// Generate a token saved in that users's cookies
	generated := auth.GenerateToken(w, r)
	if generated != nil {
		log.Printf("%v", generated)
	}
	w.WriteHeader(http.StatusCreated)
}

// LogOutUser deletes the user's remember token
func LogOutUser(w http.ResponseWriter, r *http.Request) {
	err := auth.LogOut(w, r)
	if err != nil {
		log.Printf("%v", err)
	}
	w.WriteHeader(http.StatusOK)
}

// GetOneUser retrieves one user and sends to client
func GetOneUser(w http.ResponseWriter, r *http.Request) {
	email := mux.Vars(r)["email"]
	record := user.Get(email)
	userJSON, JSONErr := json.Marshal(record)
	if JSONErr != nil {
		log.Printf("%v", JSONErr)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userJSON)
}

// GetUserByID retrieves the user by ID
func GetUserByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	record := user.GetByID(id)
	userJSON, JSONErr := json.Marshal(record)
	if JSONErr != nil {
		log.Printf("%v", JSONErr)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userJSON)
}

// UpdateUserDetails edits and saves user email or password
func UpdateUserDetails(w http.ResponseWriter, r *http.Request) {
	email := mux.Vars(r)["email"]
	// query user by email
	existing := user.Get(email)
	// read body data
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("%v", err)
	}
	// unmarshall body data into user struct
	var updatedUser user.User
	unmarshalErr := json.Unmarshal(body, &updatedUser)
	if unmarshalErr != nil {
		log.Printf("%v", unmarshalErr)
	}
	// update user
	u := &existing
	record, updated := u.Update(updatedUser)
	if updated != nil {
		log.Printf("%v", updated)
	}
	if record.RowsAffected == int64(1) {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusNotModified)
	}
}

// DeleteUser deletes a user by id
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	email := mux.Vars(r)["email"]
	existing := user.Get(email)
	u := &existing
	record1 := u.Delete()
	record2 := u.DeleteProfile()
	if record1.RowsAffected == int64(1) && record2.RowsAffected == int64(1) {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusNotModified)
	}
}

// GetProfile retrieves one user and sends to client
func GetProfile(w http.ResponseWriter, r *http.Request) {
	idAsString := mux.Vars(r)["id"]
	id, converted := strconv.Atoi(idAsString)
	if converted != nil {
		log.Printf("%v", converted)
	}
	var requestedUser user.User
	u := &requestedUser
	u.ID = uint(id)
	record := u.GetProfile()
	profileJSON, JSONErr := json.Marshal(record)
	if JSONErr != nil {
		log.Printf("%v", JSONErr)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(profileJSON)
}

// UpdateProfile edits and saves details of a user's profile
func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	// read body data
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("%v", err)
	}
	// unmarshall body data into profile struct
	var updatedProfile user.Profile
	unmarshalErr := json.Unmarshal(body, &updatedProfile)
	if unmarshalErr != nil {
		log.Printf("%v", unmarshalErr)
	}
	// update profile
	record, updated := user.UpdateProfile(id, updatedProfile)
	if updated != nil {
		log.Printf("%v", updated)
	}
	if record.RowsAffected == int64(1) {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusNotModified)
	}
}

// GetAllEvents retrieves all events
func GetAllEvents(w http.ResponseWriter, r *http.Request) {
	// Request all events currently stored in db that have not been deleted
	events := user.GetAllEvents()
	// save as JSON
	eventsJSON, err := json.Marshal(events)
	if err != nil {
		log.Printf("%v", err)
	}
	// Write headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	// Send JSON back to client
	w.Write(eventsJSON)
}

// GetSingleEvent retrieves event by id
func GetSingleEvent(w http.ResponseWriter, r *http.Request) {
	var event user.Event
	idStr := mux.Vars(r)["id"]
	id, converted := strconv.Atoi(idStr)
	if converted != nil {
		log.Printf("%v", converted)
	}
	e := &event
	e.EventID = id
	record := e.GetOneEvent()
	eventJSON, JSONErr := json.Marshal(record)
	if JSONErr != nil {
		log.Printf("%v", JSONErr)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(eventJSON)
}

// AddEvent posts a new event
func AddEvent(w http.ResponseWriter, r *http.Request) {
	// read & unmarshal request body into struct
	var newEvent user.Event
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("%v", err)
	}
	unmarshalErr := json.Unmarshal(body, &newEvent)
	if unmarshalErr != nil {
		log.Printf("%v", unmarshalErr)
	}
	// create event
	record := newEvent.CreateEvent()
	if record.RowsAffected == int64(1) {
		w.WriteHeader(http.StatusCreated)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// UpdateEvent edits and saves existing event data
func UpdateEvent(w http.ResponseWriter, r *http.Request) {
	// retrieve id from query url and convert to int
	idStr := mux.Vars(r)["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Printf("%v", err)
	}
	// create new event tied to id
	var event user.Event
	e := &event
	e.EventID = id
	var updatedEvent user.Event
	// read body data
	body, readErr := ioutil.ReadAll(r.Body)
	if readErr != nil {
		log.Printf("%v", readErr)
	}
	// unmarshal into event struct
	unmarshalErr := json.Unmarshal(body, &updatedEvent)
	if unmarshalErr != nil {
		log.Printf("%v", unmarshalErr)
	}
	// update event
	record, _ := e.UpdateEvent(updatedEvent)
	// if updated, send success response
	if record.RowsAffected == int64(1) {
		w.WriteHeader(http.StatusOK)
	} else {
		// otherwise send status not modified
		w.WriteHeader(http.StatusNotModified)
	}
}

// DeleteEvent deletes an event by id
func DeleteEvent(w http.ResponseWriter, r *http.Request) {
	var event user.Event
	idStr := mux.Vars(r)["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Printf("%v", err)
	}
	e := &event
	e.EventID = id
	record := e.DeleteEvent()
	if record.RowsAffected == int64(1) {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusNotModified)
	}
}
