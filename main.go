package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
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

	r.HandleFunc("/user", getUser).Methods("GET")
	r.HandleFunc("/user", postUser).Methods("POST")

	// Static files
	r.PathPrefix("/client/").Handler(http.StripPrefix("/client/", http.FileServer(http.Dir(""))))

	log.Fatal(http.ListenAndServe(":8080", r))
}

func getUser(w http.ResponseWriter, r *http.Request) {
	var buf bytes.Buffer
	buf.ReadFrom(r.Body)
	data := buf.String()
	u := user.Get(data)
	json.NewEncoder(w).Encode(u)
}

func postUser(w http.ResponseWriter, r *http.Request) {}
