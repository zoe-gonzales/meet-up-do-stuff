// Package env handles retrieval of env vars from the .env file
package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// RetrieveEnvVar retrieves environment variable from os or .env file
func RetrieveEnvVar(s string, pathToDotEnv string) string {
	v := os.Getenv(s)
	if v == "" {
		err := godotenv.Load(pathToDotEnv)
		if err != nil {
			log.Printf("Error loading .env file: %v", err)
		}
		v = os.Getenv(s)
	}
	return v
}
