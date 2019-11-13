package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// AuthenticateUser authenticates the user and logs them in correct credentials are provided
func AuthenticateUser(w http.ResponseWriter, r *http.Request) {}

// RegisterNewUser creates a new user in the db with provided credentials
func RegisterNewUser(w http.ResponseWriter, r *http.Request) {
	err := auth.SignUp(w, r)
	if err != nil {
		panic(err)
	}
	r.ParseForm()
	fmt.Println(r.Form)
	newUser := user.User{Email: r.Form.Get("email"), Password: r.Form.Get("email"), DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	record := u.Create()
	if record.RowsAffected == int64(1) {
		fmt.Fprintf(w, "Hello "+r.Form.Get("email"))
	} else {
		fmt.Fprintf(w, "An error occurred with your registration.")
	}
}

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
	// ***
	ids, _ := r.URL.Query()["id"]
	if len(ids) < 1 {
		log.Fatal("No params for 'id' found")
		return
	}
	idStr := ids[0]
	id, conversionErr := strconv.ParseInt(idStr, 10, 32)
	if conversionErr != nil {
		panic(conversionErr)
	}
	// ***
	e := &event
	e.EventID = int(id)
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
func AddEvent(w http.ResponseWriter, r *http.Request) {}

// UpdateEvent edits and saves existing event data
func UpdateEvent(w http.ResponseWriter, r *http.Request) {}

// DeleteEvent deletes an event by id
func DeleteEvent(w http.ResponseWriter, r *http.Request) {}