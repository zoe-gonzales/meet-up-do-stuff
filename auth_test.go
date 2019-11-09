package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
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
