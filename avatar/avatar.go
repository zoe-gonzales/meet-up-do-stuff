package avatar

import (
	"github.com/zoe-gonzales/avatar-practice/avatar"
	"github.com/zoe-gonzales/avatar-practice/hash"
)

// GenerateAvatar function takes a string, hashes it, and produces a unique avatar
func GenerateAvatar(s string) {
	avatar.Generate(hash.Email(s))
}
