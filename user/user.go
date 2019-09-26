package user

import (
	"log"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
	"golang.org/x/crypto/bcrypt"
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
	pw := []byte(u.Password)
	hashed, err := bcrypt.GenerateFromPassword(pw, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	u.Password = string(hashed)
	return u
}
