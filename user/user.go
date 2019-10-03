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
func Get(em string) *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	new := User{}
	return db.Where(`email = ? and deleted_at is null`, em).First(&new)
	// return db.Raw(`select id, email, and password from users where email = ? and deleted_at is null`, em)
}

// Update updates user data
func (u *User) Update(updatedUser User) *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating user", err)
	}
	defer db.Close()
	db.First(&u, u.ID)
	u.ID = updatedUser.ID
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

// Verify changes user field of Verified from false to true
func Verify( /*Pass in user ID */ ) {
	// Retrieve user from database
	// Update with Verified field set to true
	// No other fields updated
	// Delete token within endpoint
}

// initVerification generates a token appended to the path with the user ID
func initVerification( /*Pass in endpoint, user email */ ) error {
	// Generate token
	// Append: endpoint + token + user ID or email
	// Generate an email containing the custom endpoint
	// Send email to user's email account
	return nil
}
