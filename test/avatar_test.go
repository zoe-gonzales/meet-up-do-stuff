package test

import (
	"fmt"
	"os"
	"strconv"
	"testing"

	"github.com/zoe-gonzales/avatar-practice/avatar"
	"github.com/zoe-gonzales/avatar-practice/hash"
)

// Using code from avatar-practice
// function should take a string,
// hash it and generate an image from hash
// also takes a string representing filename
func TestShouldGenerateAvatarFromUserEmail(t *testing.T) {
	var tests = []struct {
		name     string
		email    string
		expValue string
		id       int
	}{
		{
			name:  "gmail",
			email: "john@gmail.com",
			id:    1,
		},
		{
			name:  "yahoo",
			email: "bob@yahoo.com",
			id:    2,
		},
		{
			name:  "icloud",
			email: "jane@icloud.com",
			id:    3,
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			// Create filename from user id
			fn := "user-" + strconv.FormatInt(int64(tc.id), 10)
			// Generate avatar image file from email and filename
			avatar.Generate(hash.Email(tc.email), fn)
			if _, err := os.Stat(fn + ".png"); os.IsNotExist(err) {
				// Test fails if error is not nil
				if err != nil {
					t.Errorf("Error generating avatar image: %v", err)
				}
				// Remove avatar.png file after each test
				if err == nil {
					fmt.Println("Image generated correctly")
					pathErr := os.Remove(fn + ".png")
					if pathErr != nil {
						t.Errorf("Error removing avatar.png file: %v", pathErr)
					}
				}
			}
		})
	}
}
