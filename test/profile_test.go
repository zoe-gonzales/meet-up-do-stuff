package test

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// File to contain tests for all CRUD actions for profile model

// Function should create empty profile for unverified user
func TestShouldCreateIncompleteProfile(t *testing.T) {
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	u.Create()
	created := u.CreateEmptyProfile()
	if created {
		fmt.Println("Profile successfully created")
	} else {
		fmt.Println("Error creating profile")
	}
	assert.True(t, created)
}

// Function should update user display name and location from input

// Function should update user profile image

// Function should add an interest to user profile

// Function should remove an interest from user profile

// Function should retrieve profile data

// Function should delete profile data (only called when User is deleted)
