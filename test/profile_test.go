// Contains tests for all CRUD actions for profile model
package test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

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

// Function should update any data in user profile
func TestShouldUpdateProfile(t *testing.T) {
	var tests = []struct {
		name           string
		updatedProfile user.Profile
	}{
		{
			name:           "all_fields",
			updatedProfile: user.Profile{DisplayName: "Jane Lane", Location: "New York, NY", PathToImg: "../profilepics/user-1", Interests: "painting, running, sarcasm", AdminOf: "Artists-Meetup, Runners-Club", MemberOf: "Runners-Club", RSVPS: "8,18,28,38"},
		},
		{
			name:           "some_fields",
			updatedProfile: user.Profile{Location: "Denver, CO", PathToImg: "../profilepics/user-2019", Interests: "coding, web development", RSVPS: "2,4,6"},
		},
		{
			name:           "no_fields",
			updatedProfile: user.Profile{},
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			db, err := db.Init()
			if err != nil {
				t.Errorf("Could not connect to DB to update profile")
			}
			defer db.Close()
			user.InitUserModel()
			newUser := user.User{Email: "jane@gmail.com", Password: "helloworld", DateJoined: time.Now(), Verified: false}
			u := newUser.HashPwd()
			u.Create()
			newUser.CreateEmptyProfile()
			record := u.UpdateProfile(tc.updatedProfile)
			affected := record.RowsAffected
			// Data changed in any of the fields
			if tc.updatedProfile.DisplayName != "" ||
				tc.updatedProfile.Location != "" ||
				tc.updatedProfile.PathToImg != "" ||
				tc.updatedProfile.Interests != "" ||
				tc.updatedProfile.AdminOf != "" ||
				tc.updatedProfile.MemberOf != "" ||
				tc.updatedProfile.RSVPS != "" {
				assert.Equal(t, affected, int64(1))
			}
			// No new data passed
			if tc.updatedProfile.DisplayName == "" &&
				tc.updatedProfile.Location == "" &&
				tc.updatedProfile.PathToImg == "" &&
				tc.updatedProfile.Interests == "" &&
				tc.updatedProfile.AdminOf == "" &&
				tc.updatedProfile.MemberOf == "" &&
				tc.updatedProfile.RSVPS == "" {
				assert.Zero(t, affected)
			}
			u.Delete()
			u.DeleteProfile()
		})
	}
}

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