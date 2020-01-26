// Package db handles connection to the database
package db

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // GORM dialect for postgres
	"github.com/zoe-gonzales/meet-up-do-stuff/env"
)

// Init function takes a connection string and initializes the db
func Init() (*gorm.DB, error) {
	connection := env.RetrieveEnvVar("DATABASE_URL", "./.env")
	fmt.Println(connection)
	db, err := gorm.Open("postgres", connection)
	if err != nil {
		log.Printf("Error connecting to db: %v", err)
	}
	return db, err
}
