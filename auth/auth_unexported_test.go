package auth

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

// Test for newAuthUser
func TestShouldGenerateNewAuthUser(t *testing.T) {
	var tests = []struct {
		name    string
		newUser user.User
	}{
		{
			name:    "all_fields",
			newUser: user.User{Email: "laura@gmail.com", Password: "ABCDEF", DateJoined: time.Now(), Verified: true},
		},
		{
			name:    "some_fields",
			newUser: user.User{Email: "lane@yahoo.com", DateJoined: time.Now()},
		},
		{
			name:    "no_fields",
			newUser: user.User{},
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			au, err := newAuthUser(tc.newUser)
			if tc.newUser.Email == "" || tc.newUser.Password == "" || tc.newUser.DateJoined.IsZero() || tc.newUser.Verified == false {
				assert.Error(t, err)
			} else {
				assert.NotEmpty(t, au)
				assert.Equal(t, au.Token, "")
				assert.Equal(t, au.User.Email, tc.newUser.Email)
				assert.Equal(t, au.User.Password, tc.newUser.Password)
				assert.Equal(t, au.User.DateJoined, tc.newUser.DateJoined)
				assert.Equal(t, au.User.Verified, tc.newUser.Verified)
			}
		})
	}

}
