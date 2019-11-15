package api

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// AuthenticateUser authenticates the user and logs them in correct credentials are provided
func AuthenticateUser(w http.ResponseWriter, r *http.Request) {}

// RegisterNewUser creates a new user in the db with provided credentials
func RegisterNewUser(w http.ResponseWriter, r *http.Request) {
	// read body for user data
	var newUser user.User
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	// unmarshal data into struct
	unmarshalErr := json.Unmarshal(body, &newUser)
	if unmarshalErr != nil {
		panic(unmarshalErr)
	}
	// Hash user password and create user
	u := newUser.HashPwd()
	u.DateJoined = time.Now()
	u.Verified = false
	q := u.Create()
	if q.RowsAffected != int64(1) {
		e := errors.New("Error: Unable to create user")
		panic(e)
	}
	// Retrieve user and create an empty profile linked by UserID
	myUser := user.Get(newUser.Email)
	s := myUser.CreateEmptyProfile()
	if s.RowsAffected != int64(1) {
		e := errors.New("Error: Unable to add profile to user's account")
		panic(e)
	}
	// Create new auth user using current user's data
	_, authErr := auth.NewAuthUser(myUser)
	if authErr != nil {
		panic(authErr)
	}
	// Generate a token saved in that users's cookies
	er := auth.GenerateToken(w, r)
	if er != nil {
		panic(er)
	}
	w.WriteHeader(http.StatusCreated)
}

// LogOutUser deletes the user's remember token
func LogOutUser(w http.ResponseWriter, r *http.Request) {}

// UpdateUserDetails edits and saves user email or password
func UpdateUserDetails(w http.ResponseWriter, r *http.Request) {}

// DeleteUser deletes a user by id
func DeleteUser(w http.ResponseWriter, r *http.Request) {}

// UpdateProfile edits and saves details of a user's profile
func UpdateProfile(w http.ResponseWriter, r *http.Request) {}

// GetAllEvents retrieves all events
func GetAllEvents(w http.ResponseWriter, r *http.Request) {
	// Request all events currently stored in db that have not been deleted
	events := user.GetAllEvents()
	// save as JSON
	eventsJSON, err := json.Marshal(events)
	if err != nil {
		panic(err)
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
	id, err := strconv.Atoi(idStr)
	if err != nil {
		panic(err)
	}
	e := &event
	e.EventID = id
	record := e.GetOneEvent()
	eventJSON, errJSON := json.Marshal(record)
	if errJSON != nil {
		panic(errJSON)
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
		panic(err)
	}
	unmarshalErr := json.Unmarshal(body, &newEvent)
	if unmarshalErr != nil {
		panic(unmarshalErr)
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
		panic(err)
	}
	// create new event tied to id
	var event user.Event
	e := &event
	e.EventID = id
	var updatedEvent user.Event
	// read body data
	body, readErr := ioutil.ReadAll(r.Body)
	if readErr != nil {
		panic(readErr)
	}
	// unmarshal into event struct
	unmarshalErr := json.Unmarshal(body, &updatedEvent)
	if unmarshalErr != nil {
		panic(unmarshalErr)
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
		panic(err)
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
