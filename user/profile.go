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
	ProfileID   int `gorm:"AUTO_INCREMENT"`
	DisplayName string
	Location    string
	PathToImg   string
	Interests   string
	AdminOf     string
	MemberOf    string
	RSVPS       string
}

// CreateEmptyProfile generates a new profile
func (u User) CreateEmptyProfile() *gorm.DB {
	profile := Profile{User: u, UserID: u.UserID, DisplayName: "na", Location: "na", PathToImg: "na", Interests: "na", AdminOf: "na", MemberOf: "na", RSVPS: "na"}
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user profile", err)
	}
	defer db.Close()
	return db.Create(&profile)
}
