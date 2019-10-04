package user

import (
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
func (u *User) UpdateProfile() /* *gorm.DB */ {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on updating profile", err)
	}
	defer db.Close()
	// Add update action
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
