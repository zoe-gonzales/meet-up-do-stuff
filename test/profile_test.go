package test

import (
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
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
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

// Function should delete profile data (only called when User is deleted)
