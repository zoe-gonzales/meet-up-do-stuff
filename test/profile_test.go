package test

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// File to contain tests for all CRUD actions for profile model

// Function should create empty profile for unverified user
func TestShouldCreateIncompleteProfile(t *testing.T) {
	db, err := db.Init()
	if err != nil {
		t.Errorf("Could not connect to DB to query users")
	}
	defer db.Close()
	newUser := user.User{Email: "jane@gmail.com", Password: "helloworld", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	u.Create()
	entry := u.CreateEmptyProfile()
	rowsAffected := entry.RowsAffected
	var affected int64 = 1
	assert.Equal(t, affected, rowsAffected)
	db.Delete(&u)
}

// Function should update user display name and location from input

// Function should update user profile image

// Function should add an interest to user profile

// Function should remove an interest from user profile

// Function should retrieve profile data
func TestShouldRetrieveProfile(t *testing.T) {
	db, err := db.Init()
	if err != nil {
		t.Errorf("Could not connect to DB to query users")
	}
	defer db.Close()
	user.InitUserModel()
	newUser := user.User{Email: "jane@gmail.com", Password: "helloworld", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	u.Create()
	newUser.CreateEmptyProfile()
	profile := u.GetProfile()
	var u2 user.User
	assert.IsType(t, profile.User, u2)
	assert.GreaterOrEqual(t, profile.UserID, 1)
	assert.Equal(t, profile.DisplayName, "na")
	assert.Equal(t, profile.Location, "na")
	assert.Equal(t, profile.PathToImg, "na")
	assert.Equal(t, profile.Interests, "na")
	assert.Equal(t, profile.AdminOf, "na")
	assert.Equal(t, profile.MemberOf, "na")
	assert.Equal(t, profile.RSVPS, "na")
	db.Delete(&u)
}

// Function should delete profile data (only called when User is deleted)
func TestShouldDeleteProfile(t *testing.T) {
	db, err := db.Init()
	if err != nil {
		t.Errorf("Could not connect to DB to delete profile")
	}
	defer db.Close()
	user.InitUserModel()
	newUser := user.User{Email: "jane@gmail.com", Password: "helloworld", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	u.Create()
	newUser.CreateEmptyProfile()
	u.Delete()
	u.DeleteProfile()
	profile := u.GetProfile()
	fmt.Println(profile)
	assert.Empty(t, profile.User)
	assert.Equal(t, profile.UserID, 0)
	assert.Equal(t, profile.DisplayName, "")
	assert.Equal(t, profile.Location, "")
	assert.Equal(t, profile.PathToImg, "")
	assert.Equal(t, profile.Interests, "")
	assert.Equal(t, profile.AdminOf, "")
	assert.Equal(t, profile.MemberOf, "")
	assert.Equal(t, profile.RSVPS, "")
}
