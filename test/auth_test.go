package test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/auth"
)

// Test for InitAuth IN PROGRESS
func TestShouldConfigureAuth(t *testing.T) {
	au := auth.InitAuth()
	assert.Equal(t, au.Config.Paths.RootURL, "http://localhost:1323")
	// assert.NotNil(t, au.Config.Storage.SessionState)
	// assert.NotNil(t, au.Config.Storage.CookieState)
}

// Test for Load IN PROGRESS
func TestShouldLoadUserFromDBAndUpdateAuthUser(t *testing.T) {
	// u := user.User{Email: "laura@gmail.com", Password: "ABCDEF", DateJoined: time.Now(), Verified: true}
}

// Test for Save
func TestShouldSaveUpdatedAuthUser(t *testing.T) {

}

// Test for InitModels
func TestShouldCreateModelsForAuth(t *testing.T) {

}

// Test for GetPID
func TestShouldRetrieveAuthUserEmail(t *testing.T) {

}

// Test for PutPID
func TestShouldUpdateAuthUserEmail(t *testing.T) {

}

// Test for SignUp
func TestShouldRegisterUser(t *testing.T) {

}

// Test for GenerateToken
func TestShouldCreateTokenAndSaveToUserCookies(t *testing.T) {

}

// Test for AuthenticateUser
func TestShouldAuthenticateUserWithCookie(t *testing.T) {

}

// Test for LogOut
func TestShouldLogOutUserAndDeleteToken(t *testing.T) {

}
