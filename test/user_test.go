package test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
	"golang.org/x/crypto/bcrypt"
)

// File to contain tests for all CRUD actions for user model

// Given a password (string), function should return a hash of that string
func TestShouldGenerateHashFromUserEmail(t *testing.T) {
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte("12345"))
	assert.Nil(t, err)
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
	entry := u.Create()
	rowsAffected := entry.RowsAffected
	var affected int64 = 1
	assert.Equal(t, affected, rowsAffected)
	db.Delete(&u)
}

// Function should verify user

// Function should update user data (email or password)

// Function should retrieve user
func TestShouldRetrieveUser(t *testing.T) {
	db, err := db.Init()
	if err != nil {
		t.Errorf("Could not connect to DB to query users")
	}
	defer db.Close()
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	u.Create()
	data := user.Get(`bob@gmail.com`)
	assert.Equal(t, data.Email, "bob@gmail.com")
	assert.Equal(t, data.Verified, false)
	db.Delete(&u)
}

// Function should delete user
