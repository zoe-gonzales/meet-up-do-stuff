package test

import (
	"crypto/sha1"
	"fmt"
	"io"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// File to contain tests for all CRUD actions for user model

// Given a password (string), function should return a hash of that string
func TestShouldGenerateHashFromUserEmail(t *testing.T) {
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	a := sha1.New()
	io.WriteString(a, "12345")
	c := string(a.Sum(nil))
	assert.Equal(t, u.Password, c)
}

// Given an email and hashed password, function should create an unverified user and save user to db
func TestShouldCreateUnverifiedUserInDB(t *testing.T) {
	db, err := db.Init()
	if err != nil {
		t.Errorf("Could not connect to DB to query users")
	}
	defer db.Close()
	user.InitUserModel()
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	created := u.Create()
	if created {
		fmt.Println("User successfully created")
	} else {
		fmt.Println("Error creating user")
	}
	assert.True(t, created)
}

// Function should verify user

// Function should update user data (email or password)

// Function should retrieve user

// Function should delete user
