package db

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // GORM dialect for postgres
	"github.com/zoe-gonzales/meet-up-do-stuff/env"
)

// Given a connection string
// functions opens a connection to db,
// checks for errors
// and returns pointer to db and error

// Init function takes a connection string and initializes the db
func Init() (*gorm.DB, error) {
	connection := env.RetrieveEnvVar("CONNECTION", "../.env")
	db, err := gorm.Open("postgres", connection)
	if err != nil {
		log.Fatal("Error connecting to db", err)
	}
	return db, err
}
