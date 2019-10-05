// Package auth handles sign up, log in, and log out of users
// also includes session management through authboss package
package auth

import (
	"context"
	"fmt"
	"net/http"
	"time"

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
	// OAuth2
	OAuth2UID      string
	OAuth2Provider string
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
func InitAuth() {
	us := user.User{}
	ab.Config.Paths.RootURL = "http://localhost:1323"
	ab.Config.Storage.Server = newAuthUser(us)
	ab.Config.Storage.SessionState = SessionStore
	ab.Config.Storage.CookieState = CookieStore

	if err := ab.Init(); err != nil {
		panic(err)
	}
}

func newAuthUser(u user.User) *authUser {
	return &authUser{
		User:  u,
		Token: "",
	}
}

// Load queries db for user
func (au authUser) Load(ctx context.Context, key string) (authboss.User, error) {
	provider, uid, err := authboss.ParseOAuth2PID(key)
	if err == nil {
		if au.OAuth2Provider == provider && au.OAuth2UID == uid {
			fmt.Println("Loaded OAuth2 user:", au.User)
			return &au, nil
		}
		return nil, authboss.ErrUserNotFound
	}

	email := au.GetPID()
	user := user.Get(email)
	var exists bool
	if user.Email == "" {
		exists = false
	} else {
		exists = true
	}

	if exists {
		return nil, authboss.ErrUserNotFound
	}

	fmt.Println("Loaded user:", au.User.Email)
	return &au, nil
}

// Save saves user to db
func (au authUser) Save(ctx context.Context, authUs authboss.User) error {
	us := user.User{Email: "", Password: "", DateJoined: time.Now(), Verified: false}
	newUs := user.User{Email: "abc@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: true}
	us.Update(newUs)
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
func InitModels() {
	if errS := s.Init(ab); errS != nil {
		panic(errS)
	}
	if errL := l.Init(ab); errL != nil {
		panic(errL)
	}
	if errO := o.Init(ab); errO != nil {
		panic(errO)
	}
}

// SignUp registers user
func SignUp(w http.ResponseWriter, req *http.Request) {
	if errPost := s.Post(w, req); errPost != nil {
		panic(errPost)
	}
}

// AuthenticateUser signs user into their account
func AuthenticateUser(
	w http.ResponseWriter,
	authW http.ResponseWriter,
	req *http.Request,
	authReq **http.Request,
) {
	if _, err := l.RememberAfterAuth(w, req, false); err != nil {
		panic(err)
	}
	if errAuth := remember.Authenticate(ab, authW, authReq); errAuth != nil {
		panic(errAuth)
	}
}

// LogOut logs the user out of their account & deletes the current session
func LogOut(w http.ResponseWriter, req *http.Request) {
	if errLogOut := o.Logout(w, req); errLogOut != nil {
		panic(errLogOut)
	}
}
