// Package user contains models and CRUD actions relating to the user
package user

import (
	"errors"
	"log"
	"strconv"

	"github.com/jinzhu/gorm"
	"github.com/zoe-gonzales/meet-up-do-stuff/avatar"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Profile type holds extended information about a user
type Profile struct {
	gorm.Model
	User        User `gorm:"foreignkey:UserID"`
	UserID      int
	DisplayName string
	Location    string
	Interests   string
	AdminOf     string
	MemberOf    string
	RSVPS       string
}

// CreateEmptyProfile generates a new profile with no data
func (u User) CreateEmptyProfile() *gorm.DB {
	id := int(u.ID)
	// create filename for avatar & generate image
	fn := "user-" + strconv.FormatInt(int64(u.ID), 10)
	avatar.GenerateAvatar(u.Email, fn, "./client/src/user_images/")
	profile := Profile{User: u, UserID: id, DisplayName: "---", Location: "---", Interests: "---", AdminOf: "---", MemberOf: "---", RSVPS: "---"}
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on creating user profile: %v", err)
	}
	defer db.Close()
	return db.Create(&profile)
}

// UpdateProfile updates fields in a user's profile
func UpdateProfile(id string, updatedProfile Profile) (*gorm.DB, error) {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on updating profile: %v", err)
	}
	defer db.Close()
	var profile Profile
	db.Raw(`select * from profiles where user_id = ?`, id).Scan(&profile)

	// Data changed
	if updatedProfile.DisplayName != "" {
		profile.DisplayName = updatedProfile.DisplayName
	}
	if updatedProfile.Location != "" {
		profile.Location = updatedProfile.Location
	}
	if updatedProfile.Interests != "" {
		profile.Interests = updatedProfile.Interests
	}
	if updatedProfile.AdminOf != "" {
		profile.AdminOf = updatedProfile.AdminOf
	}
	if updatedProfile.MemberOf != "" {
		profile.MemberOf = updatedProfile.MemberOf
	}
	if updatedProfile.RSVPS != "" {
		profile.RSVPS = updatedProfile.RSVPS
	}

	// No data changed
	if updatedProfile.DisplayName == "" ||
		updatedProfile.Location == "" ||
		updatedProfile.Interests == "" ||
		updatedProfile.AdminOf == "" ||
		updatedProfile.MemberOf == "" ||
		updatedProfile.RSVPS == "" {
		err := errors.New("error updating record: some or all fields are empty")
		return db, err
	}
	return db.Save(&profile), nil
}

// GetProfile retrieves a user's profile
func (u *User) GetProfile() Profile {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on fetching profile: %v", err)
	}
	defer db.Close()
	var profile Profile
	db.Raw(`select * from profiles where user_id = ? and deleted_at is null`, u.ID).Scan(&profile)
	return profile
}

// DeleteProfile removes a profile from the db
func (u *User) DeleteProfile() *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on deleting profile: %v", err)
	}
	profile := u.GetProfile()
	defer db.Close()
	return db.Delete(&profile)
}
