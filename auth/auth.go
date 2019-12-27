// Package auth handles sign up, log in, and log out of users
// also includes session management through authboss package
package auth

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/gorilla/securecookie"
	"github.com/volatiletech/authboss"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	"github.com/volatiletech/authboss/logout"
	"github.com/volatiletech/authboss/register"
	"github.com/volatiletech/authboss/remember"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// UserAuth holds information about the user's authorization
type UserAuth struct {
	User  user.User
	Token string
}

var (
	ab = authboss.New()
	// SessionStore holds session info
	SessionStore abclientstate.SessionStorer
	// CookieStore holds cookie info
	CookieStore abclientstate.CookieStorer
)

const (
	// SessionCookieName defines name of session cookie
	SessionCookieName = "meeting_app"
)

// InitAuth sets up and runs auth
func InitAuth() *authboss.Authboss {
	ab.Config.Paths.RootURL = "http://localhost:8080"
	ab.Config.Storage.SessionState = SessionStore
	ab.Config.Storage.CookieState = CookieStore
	return ab
}

// NewAuthUser creates a new authUser struct
func NewAuthUser(u user.User) (*UserAuth, error) {
	if u.Email == "" || u.Password == "" {
		return &UserAuth{}, errors.New("Cannot create authUser from nil values")
	}
	return &UserAuth{User: u, Token: ""}, nil
}

// Load queries db for user and saves in authUser struct
func (au UserAuth) Load(ctx context.Context, key string) (authboss.User, error) {
	email := au.GetPID()
	user := user.Get(email)
	var exists bool
	// check if user exists
	if user.Email == "" {
		exists = false
	} else {
		exists = true
		au.User = user
	}
	// return error if user not found
	if !exists {
		return nil, authboss.ErrUserNotFound
	}
	return &au, nil
}

// Save saves user to db
func (au UserAuth) Save(ctx context.Context, authUs authboss.User) error {
	email := au.GetPID()
	user := user.Get(email)
	var exists bool
	// check if user exists
	if user.Email == "" {
		exists = false
	} else {
		exists = true
		au.User = user
	}
	// return error if user not found
	if !exists {
		return authboss.ErrUserNotFound
	}
	user.Update(au.User)
	return nil
}

// GetPID retrieves user identification
func (au UserAuth) GetPID() string { return au.User.Email }

// PutPID updates user identification
func (au *UserAuth) PutPID(pid string) { au.User.Email = pid }

var (
	s = register.Register{ab}
	l = remember.Remember{ab}
	o = logout.Logout{ab}
)

// InitModels initializes all models for registration, sign in, and log out
func InitModels() error {
	if errS := s.Init(ab); errS != nil {
		return errS
	}
	if errL := l.Init(ab); errL != nil {
		return errL
	}
	if errO := o.Init(ab); errO != nil {
		return errO
	}
	return nil
}

// SignUp registers user
func SignUp(w http.ResponseWriter, req *http.Request, u user.User) error {
	return s.Post(w, req)
}

// GenerateToken creates a token and saves it in the user's cookies
func GenerateToken(w http.ResponseWriter, req *http.Request) error {
	_, err := l.RememberAfterAuth(w, req, false)
	return err
}

// AuthenticateUser signs user into their account
func AuthenticateUser(w http.ResponseWriter, req **http.Request) error {
	return remember.Authenticate(ab, w, req)
}

// LogOut deletes all current sessions & cookies
func LogOut(w http.ResponseWriter, req *http.Request) error {
	/* need to look into, may need to define
	a CurrentUser within routes.go or main.go */
	return (&o).Logout(w, req)
}

var sc = securecookie.New(securecookie.GenerateRandomKey(16), securecookie.GenerateRandomKey(16))

// SetCookieHandler encodes the cookie value
func SetCookieHandler(w http.ResponseWriter, r *http.Request) *http.Cookie {
	value := map[string]string{
		"user-cookie": "1",
	}
	encoded, err := sc.Encode("user-cookie", value)
	if err == nil {
		cookie := &http.Cookie{
			Name:  "user-cookie",
			Value: encoded,
			Path:  "/",
		}
		return cookie
	}
	return nil
}

// ReadCookieHandler decodes cookie value
func ReadCookieHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("user-cookie")
	if err == nil {
		value := map[string]string{}
		err2 := sc.Decode("user-cookie", cookie.Value, &value)
		if err2 == nil {
			fmt.Printf("The value of the cookie is %q", value["user-cookie"])
		}
	}
}
