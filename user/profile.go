package user

import "github.com/jinzhu/gorm"

// Profile type holds extended information about a user
type Profile struct {
	gorm.Model
	User        User
	ProfileID   int `gorm:"AUTO_INCREMENT"`
	DisplayName string
	Location    string
	PathToImg   string // Profile image saved in file system path saved in db
	Interests   []string
	AdminOf     []int // group_id
	MemberOf    []int // group_id
	RSVPS       []int // event_id
}
