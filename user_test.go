// Contains tests for all CRUD actions for user model, including pw hashing
package main

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
	"golang.org/x/crypto/bcrypt"
)

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
	record := u.Create()
	rowsAffected := record.RowsAffected
	var affected int64 = 1
	assert.Equal(t, affected, rowsAffected)
	db.Delete(&u)
}

// Function should update user data
func TestShouldUpdateUserData(t *testing.T) {
	var tests = []struct {
		name        string
		updatedUser user.User
	}{
		{
			name:        "email_and_password",
			updatedUser: user.User{Email: "sally@gmail.com", Password: "54321"},
		},
		{
			name:        "just_email",
			updatedUser: user.User{Email: "abc123@yahoo.com"},
		},
		{
			name:        "just_password",
			updatedUser: user.User{Password: "helloworld"},
		},
		{
			name:        "neither_email_nor_password",
			updatedUser: user.User{},
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			db, err := db.Init()
			if err != nil {
				t.Errorf("Could not connect to DB to update user")
			}
			defer db.Close()
			user.InitUserModel()
			newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
			u := newUser.HashPwd()
			u.Create()
			record, err := u.Update(tc.updatedUser)
			rowsAffected := record.RowsAffected
			switch c := tc.name; c {
			case "email_and_password":
				assert.Equal(t, rowsAffected, int64(1))
			case "just_email":
				assert.Error(t, err)
			case "just_password":
				assert.Error(t, err)
			case "neither_email_nor_password":
				assert.Error(t, err)
			}
			db.Delete(&u)
		})
	}
}

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
func TestShouldDeleteUserFromDB(t *testing.T) {
	db, err := db.Init()
	if err != nil {
		t.Errorf("Could not connect to DB to delete user")
	}
	defer db.Close()
	user.InitUserModel()
	newUser := user.User{Email: "bob@gmail.com", Password: "12345", DateJoined: time.Now(), Verified: false}
	u := newUser.HashPwd()
	u.Create()
	u.Delete()
	data := user.Get(`bob@gmail.com`)
	var ti time.Time
	assert.Equal(t, data.Email, "")
	assert.Equal(t, data.Password, "")
	assert.Equal(t, data.DateJoined, ti)
	assert.Equal(t, data.Verified, false)
}

// Function should verify user
