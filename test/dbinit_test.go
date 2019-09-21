package test

import (
	"database/sql"
	"testing"

	_ "github.com/lib/pq"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Given a connection string to a db
// Function should open a connection
// and check for errors
// if errors occur, test fails

func TestShouldConnectToDB(t *testing.T) {
	db, err := db.InitDB()
	assert.Nil(t, err)
	var a *sql.DB
	assert.IsType(t, db, a)
}
