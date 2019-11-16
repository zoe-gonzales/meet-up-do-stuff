// Package avatar generates and saves an avatar image to the file system
package avatar

import (
	"github.com/zoe-gonzales/avatar-practice/avatar"
	"github.com/zoe-gonzales/avatar-practice/hash"
)

// GenerateAvatar function takes a string, hashes it, and produces a unique avatar
// Function also accepts a filename, which is prepended to file extension .png
func GenerateAvatar(s string, fn string, p string) {
	avatar.Generate(hash.Email(s), fn, p)
}
