package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// AuthenticateUser authenticates the user and logs them in if they have submitted
// correct email and passwords
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
