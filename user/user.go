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

// Get retrieves a user from email
func (u *User) Get(em string) *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	return db.Where("email = ?", em).Find(&u)
}

// Update updates user data
func (u *User) Update(updatedUser User) *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	db.First(&u, u.ID)
	u.UserID = updatedUser.UserID
	u.Email = updatedUser.Email
	u.Password = updatedUser.Password
	u.DateJoined = updatedUser.DateJoined
	u.Verified = updatedUser.Verified
	return db.Save(&u)
}

// Delete removes a user from db
func (u *User) Delete() *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	return db.Delete(&u)
}
