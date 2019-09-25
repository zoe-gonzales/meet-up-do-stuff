package user

import (
	"crypto/sha1"
	"io"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// User type holds basic information about a user
type User struct {
	gorm.Model
	UserID     int `gorm:"AUTO_INCREMENT"`
	Email      string
	Password   string
	DateJoined time.Time
	Verified   bool
}

// InitUserModel sets up models in the User package
func InitUserModel() {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	db.AutoMigrate(&User{}, &Profile{})
}

// Create generates a new user
func (u User) Create() bool {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	db.Create(&u)
	return db.NewRecord(u)
}

// HashPwd generates hash from user's password
func (u User) HashPwd() User {
	h := sha1.New()
	io.WriteString(h, u.Password)
	u.Password = string(h.Sum(nil))
	return u
}
