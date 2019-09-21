package db

import (
	"database/sql"
	"log"

	"github.com/zoe-gonzales/meet-up-do-stuff/env"
)

// Given a connection string
// functions opens a connection to db,
// checks for errors
// and returns pointer to db and error

// InitDB function takes a connection string and initializes the db
func InitDB() (*sql.DB, error) {
	connection := env.RetrieveEnvVar("CONNECTION", "../.env")
	db, err := sql.Open("postgres", connection)
	if err != nil {
		log.Fatal(err)
	}
	return db, err
}
