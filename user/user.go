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

// Create generates a new user
func (u *User) Create() *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	return db.Create(&u)
}

// HashPwd generates hash from user's password
func (u *User) HashPwd() *User {
	h := sha1.New()
	io.WriteString(h, u.Password)
	u.Password = string(h.Sum(nil))
	return u
}
