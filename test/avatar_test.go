package test

import (
	"fmt"
	"os"
	"testing"

	"github.com/zoe-gonzales/avatar-practice/avatar"
	"github.com/zoe-gonzales/avatar-practice/hash"
)

// Using code from avatar-practice
// function should take a string,
// hash it and generate an image from hash

// up next
// convert image to binary data
// return binary data

func TestShouldGenerateAvatarFromUserEmail(t *testing.T) {
	var tests = []struct {
		name     string
		email    string
		expValue string
	}{
		{
			name:  "gmail",
			email: "john@gmail.com",
		},
		{
			name:  "yahoo",
			email: "bob@yahoo.com",
		},
		{
			name:  "icloud",
			email: "jane@icloud.com",
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			avatar.Generate(hash.Email(tc.email))
			if _, err := os.Stat("avatar.png"); os.IsNotExist(err) {
				// Test fails if error is not nil
				if err != nil {
					t.Errorf("Error generating avatar image: %v", err)
				}
				// Remove avatar.png file after each test
				if err == nil {
					fmt.Println("Image generated correctly")
					pathErr := os.Remove("avatar.png")
					if pathErr != nil {
						t.Errorf("Error removing avatar.png file: %v", pathErr)
					}
				}
			}
		})
	}
}
