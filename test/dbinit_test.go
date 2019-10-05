// Contains test for validating database set up
package test

import (
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // GORM dialect for postgres
	_ "github.com/lib/pq"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Test checks that database is successfully initiated
func TestShouldConnectToDB(t *testing.T) {
	db, err := db.Init()
	assert.Nil(t, err)
	var a *gorm.DB
	assert.IsType(t, db, a)
}
