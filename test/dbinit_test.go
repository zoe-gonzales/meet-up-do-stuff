package test

import (
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // GORM dialect for postgres
	_ "github.com/lib/pq"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Given a connection string to a db
// Function should open a connection
// and check for errors
// if errors occur, test fails

func TestShouldConnectToDB(t *testing.T) {
	db, err := db.Init()
	assert.Nil(t, err)
	var a *gorm.DB
	assert.IsType(t, db, a)
}
