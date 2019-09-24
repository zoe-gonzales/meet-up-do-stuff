package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Given a string (name of env var)
// function checks for env var in os
// if not there, checks .env file
// if value not found
// returns error

// RetrieveEnvVar retrieves environment variable from os or .env file
func RetrieveEnvVar(s string, pathToDotEnv string) string {
	v := os.Getenv(s)
	if v == "" {
		err := godotenv.Load(pathToDotEnv)
		if err != nil {
			log.Fatal("Error loading .env file", err)
		}
		v = os.Getenv(s)
	}
	return v
}
