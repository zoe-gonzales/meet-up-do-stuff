// Package user contains models and CRUD actions relating to the user
package user

import (
	"errors"
	"log"

	"github.com/jinzhu/gorm"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Profile type holds extended information about a user
type Profile struct {
	gorm.Model
	User        User `gorm:"foreignkey:UserID"`
	UserID      int
	DisplayName string
	Location    string
	PathToImg   string
	Interests   string
	AdminOf     string
	MemberOf    string
	RSVPS       string
}

// CreateEmptyProfile generates a new profile with no data
func (u User) CreateEmptyProfile() *gorm.DB {
	profile := Profile{User: u, UserID: 1, DisplayName: "na", Location: "na", PathToImg: "na", Interests: "na", AdminOf: "na", MemberOf: "na", RSVPS: "na"}
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user profile", err)
	}
	defer db.Close()
	return db.Create(&profile)
}

// UpdateProfile updates fields in a user's profile
func (u *User) UpdateProfile(updatedProfile Profile) (*gorm.DB, error) {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on updating profile", err)
	}
	defer db.Close()
	var profile Profile
	db.Raw(`select * from profile where user_id = ?`, u.ID).Scan(&profile)

	// Data changed
	if updatedProfile.DisplayName != "" {
		profile.DisplayName = updatedProfile.DisplayName
	}
	if updatedProfile.Location != "" {
		profile.Location = updatedProfile.Location
	}
	if updatedProfile.PathToImg != "" {
		profile.PathToImg = updatedProfile.PathToImg
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
		updatedProfile.PathToImg == "" ||
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
		log.Fatal("Error initalizing database on retrieving profile", err)
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
		log.Fatal("Error initalizing database on deleting profile", err)
	}
	defer db.Close()
	var profile Profile
	return db.Raw(`delete from profiles where user_id = ? and deleted_at is null`, u.ID).Scan(&profile)
}
