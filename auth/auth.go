package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/volatiletech/authboss"
	abclientstate "github.com/volatiletech/authboss-clientstate"
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
	// CookieStore holds session info
	CookieStore abclientstate.CookieStorer
)

const (
	// SessionCookieName defines name of session cookie
	SessionCookieName = "meeting_app"
)

// InitAuth sets up and runs auth
func InitAuth() {
	ab.Config.Paths.RootURL = "http://localhost:1323"
	ab.Config.Storage.Server = newAuthUser()
	ab.Config.Storage.SessionState = SessionStore
	ab.Config.Storage.CookieState = CookieStore

	if err := ab.Init(); err != nil {
		panic(err)
	}
}

func newAuthUser() *authUser {
	return &authUser{
		User: user.User{
			Email:      "bob@gmail.com",
			Password:   "12345",
			DateJoined: time.Now(),
			Verified:   false},
		Token: "",
	}
}

// Load function queries db for user
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
	newUser := user.User{Email: "", Password: "", DateJoined: time.Now(), Verified: false}
	db := newUser.Get(email)
	exists := db.RecordNotFound()

	if exists {
		return nil, authboss.ErrUserNotFound
	}

	fmt.Println("Loaded user:", au.User.Email)
	return &au, nil
}

// Save function saves user to db
func (au authUser) Save(ctx context.Context, authUs authboss.User) error {
	us := user.User{Email: "", Password: "", DateJoined: time.Now(), Verified: false}
	newUs := user.User{Email: "abc@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: true}
	us.Update(newUs)
	return nil
}

func (au authUser) GetPID() string     { return au.User.Email }
func (au *authUser) PutPID(pid string) { au.User.Email = pid }
