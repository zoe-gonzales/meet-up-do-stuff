// Package avatar generates and saves an avatar image to the file system
package avatar

import (
	"github.com/zoe-gonzales/avatar-practice/avatar"
	"github.com/zoe-gonzales/avatar-practice/hash"
)

// GenerateAvatar produces a unique avatar image (.png) from a string
// Requires a filename and path to store image in file system
func GenerateAvatar(s string, fn string, p string) {
	avatar.Generate(hash.Email(s), fn, p)
}
