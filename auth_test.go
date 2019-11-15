package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/volatiletech/authboss"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// Test for InitAuth
func TestShouldConfigureAuth(t *testing.T) {
	au := auth.InitAuth()
	assert.Equal(t, au.Config.Paths.RootURL, "http://localhost:1323")
	assert.NotNil(t, au.Config.Storage.SessionState)
	assert.NotNil(t, au.Config.Storage.CookieState)
}

// Test for InitModels
func TestShouldCreateModelsForAuth(t *testing.T) {
	err := auth.InitModels()
	assert.NotNil(t, err)
}

// Test for newAuthUser
func TestShouldGenerateNewAuthUser(t *testing.T) {
	var tests = []struct {
		name    string
		newUser user.User
	}{
		{
			name:    "all_fields",
			newUser: user.User{Email: "laura@gmail.com", Password: "ABCDEF", DateJoined: time.Now(), Verified: true},
		},
		{
			name:    "some_fields",
			newUser: user.User{Email: "lane@yahoo.com", DateJoined: time.Now()},
		},
		{
			name:    "no_fields",
			newUser: user.User{},
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			au, err := auth.NewAuthUser(tc.newUser)
			if tc.newUser.Email == "" || tc.newUser.Password == "" || tc.newUser.DateJoined.IsZero() || tc.newUser.Verified == false {
				assert.Error(t, err)
			} else {
				assert.NotEmpty(t, au)
				assert.Equal(t, au.Token, "")
				assert.Equal(t, au.User.Email, tc.newUser.Email)
				assert.Equal(t, au.User.Password, tc.newUser.Password)
				assert.Equal(t, au.User.DateJoined, tc.newUser.DateJoined)
				assert.Equal(t, au.User.Verified, tc.newUser.Verified)
			}
		})
	}

}

// Test for Load
func TestShouldLoadUserFromDBAndUpdateAuthUser(t *testing.T) {
	u := user.User{Email: "bob@gmail.com", Password: "ABCDEF", DateJoined: time.Now(), Verified: true}
	au, err := auth.NewAuthUser(u)
	if err != nil {
		t.Errorf("There was an error: %v", err)
	}
	var c context.Context
	au2, err2 := au.Load(c, "a")
	assert.NotNil(t, au2)
	assert.Nil(t, err2)
}

// Test for Save
func TestShouldSaveUpdatedAuthUser(t *testing.T) {
	u := user.User{Email: "bob@gmail.com", Password: "ABCDEF", DateJoined: time.Now(), Verified: true}
	au, err := auth.NewAuthUser(u)
	if err != nil {
		t.Errorf("There was an error: %v", err)
	}
	var c context.Context
	var a authboss.User
	au.User.Email = "bob@outlook.com"
	err2 := au.Save(c, a)
	e := "bob@outlook.com"
	assert.NotNil(t, err2)
	assert.Equal(t, e, au.User.Email)
}

// Test for SignUp
func TestShouldRegisterUser(t *testing.T) {
	handler := (http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := auth.SignUp(w, r)
		if err != nil {
			t.Errorf("Error in the SignUp function: %s", err)
		}
	}))
	ts := httptest.NewServer(handler)
	defer ts.Close()
}

// Test for GenerateToken
func TestShouldCreateTokenAndSaveToUserCookies(t *testing.T) {
	handler := (http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := auth.GenerateToken(w, r)
		if err != nil {
			t.Errorf("Error in the GenerateToken function: %s", err)
		}
	}))
	ts := httptest.NewServer(handler)
	defer ts.Close()
}

// Test for AuthenticateUser
func TestShouldAuthenticateUserWithCookie(t *testing.T) {
	handler := (http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rr := &r
		err := auth.AuthenticateUser(w, rr)
		if err != nil {
			t.Errorf("Error in the AuthenticateUser function: %s", err)
		}
	}))
	ts := httptest.NewServer(handler)
	defer ts.Close()
}

// Test for LogOut
func TestShouldLogOutUserAndDeleteToken(t *testing.T) {
	handler := (http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := auth.LogOut(w, r)
		if err != nil {
			t.Errorf("Error in the LogOut function: %s", err)
		}
	}))
	ts := httptest.NewServer(handler)
	defer ts.Close()
}
