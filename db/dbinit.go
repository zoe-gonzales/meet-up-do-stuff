// Package db handles connection to the database
package db

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // GORM dialect for postgres
	"github.com/zoe-gonzales/meet-up-do-stuff/env"
)

// Init function takes a connection string and initializes the db
func Init() (*gorm.DB, error) {
	connection := env.RetrieveEnvVar("CONNECTION", "../.env")
	db, err := gorm.Open("postgres", connection)
	if err != nil {
		log.Fatal("Error connecting to db", err)
	}
	return db, err
}
