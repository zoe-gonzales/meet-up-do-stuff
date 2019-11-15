// Package auth handles sign up, log in, and log out of users
// also includes session management through authboss package
package auth

import (
	"context"
	"errors"
	"net/http"

	"github.com/volatiletech/authboss"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	"github.com/volatiletech/authboss/logout"
	"github.com/volatiletech/authboss/register"
	"github.com/volatiletech/authboss/remember"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

type authUser struct {
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
	// us := user.User{Email: "jill@gmail.com", Password: "ABC", DateJoined: time.Now(), Verified: true}
	// au, err := newAuthUser(us)
	// if err != nil {
	// 	panic(err)
	// }
	ab.Config.Paths.RootURL = "http://localhost:1323"
	// ab.Config.Storage.Server = au
	ab.Config.Storage.SessionState = SessionStore
	ab.Config.Storage.CookieState = CookieStore

	return ab
}

func newAuthUser(u user.User) (*authUser, error) {
	if u.Email == "" || u.Password == "" || u.DateJoined.IsZero() || u.Verified == false {
		return &authUser{}, errors.New("Cannot create authUser from nil values")
	}
	return &authUser{User: u, Token: ""}, nil
}

// Load queries db for user and saves in authUser struct
func (au authUser) Load(ctx context.Context, key string) (authboss.User, error) {
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
func (au authUser) Save(ctx context.Context, authUs authboss.User) error {
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

func (au authUser) GetPID() string     { return au.User.Email }
func (au *authUser) PutPID(pid string) { au.User.Email = pid }

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
	if errPost := s.Post(w, req); errPost != nil {
		return errPost
	}
	_, err := newAuthUser(u)
	if err != nil {
		return err
	}
	return nil
}

// GenerateToken creates a token and saves it in the user's cookies
func GenerateToken(w http.ResponseWriter, req *http.Request) error {
	if _, err := l.RememberAfterAuth(w, req, false); err != nil {
		return err
	}
	return nil
}

// AuthenticateUser signs user into their account
func AuthenticateUser(w http.ResponseWriter, req **http.Request) error {
	if errAuth := remember.Authenticate(ab, w, req); errAuth != nil {
		return errAuth
	}
	return nil
}

// LogOut logs the user out of their account & deletes the current session
func LogOut(w http.ResponseWriter, req *http.Request) error {
	if errLogOut := o.Logout(w, req); errLogOut != nil {
		return errLogOut
	}
	return nil
}
