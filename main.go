package main

import (
	"encoding/base64"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	"github.com/zoe-gonzales/meet-up-do-stuff/api"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
)

func main() {
	cookieKey := base64.StdEncoding.EncodeToString(securecookie.GenerateRandomKey(64))
	sessionKey := base64.StdEncoding.EncodeToString(securecookie.GenerateRandomKey(64))
	cookieStoreKey, _ := base64.StdEncoding.DecodeString(cookieKey)
	sessionStoreKey, _ := base64.StdEncoding.DecodeString(sessionKey)
	auth.CookieStore = abclientstate.NewCookieStorer(cookieStoreKey, nil)
	auth.CookieStore.HTTPOnly = false
	auth.CookieStore.Secure = false
	auth.SessionStore = abclientstate.NewSessionStorer(auth.SessionCookieName, sessionStoreKey, nil)
	cstore := auth.SessionStore.Store.(*sessions.CookieStore)
	cstore.Options.HttpOnly = false
	cstore.Options.Secure = false
	cstore.MaxAge(int((30 * 24 * time.Hour) / time.Second))

	// call function to set up auth
	auth.InitAuth()

	r := mux.NewRouter()

	// User & Profile endpoints
	r.HandleFunc("/user/:email", api.AuthenticateUser).Methods("GET")
	r.HandleFunc("/user", api.RegisterNewUser).Methods("POST")
	r.HandleFunc("/user/:email", api.UpdateUserDetails).Methods("PUT")
	r.HandleFunc("/user/:email", api.DeleteUser).Methods("DELETE")
	r.HandleFunc("/profile/:email", api.UpdateProfile).Methods("PUT")

	// Event endpoints
	r.HandleFunc("/events", api.GetAllEvents).Methods("GET")
	r.HandleFunc("/events/:id", api.GetSingleEvent).Methods("GET")
	r.HandleFunc("/event", api.AddEvent).Methods("POST")
	r.HandleFunc("/event/:id", api.UpdateEvent).Methods("PUT")
	r.HandleFunc("/event/:id", api.DeleteEvent).Methods("DELETE")

	// Static files
	r.PathPrefix("/client/").Handler(http.StripPrefix("/client/", http.FileServer(http.Dir(""))))

	log.Fatal(http.ListenAndServe(":8080", r))
}
