package user

import (
	"errors"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Event type holds information about an individual event
type Event struct {
	gorm.Model
	EventID     int    `gorm:"AUTO_INCREMENT"`
	Owners      string // list of user ids - currently uses one id but in the future will support multiple owners for an event
	Title       string
	Interests   string // list of related interests (tags)
	Desc        string
	DateAndTime time.Time
	Location    string
	RSVPs       string // list of user ids
}

// CreateEvent generates a new event and saves to db
func (e Event) CreateEvent() *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on creating event: %v", err)
	}
	defer db.Close()
	return db.Create(&e)
}

// GetAllEvents retrieves and returns all current or upcoming events
func GetAllEvents() []Event {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on retrieving event: %v", err)
	}
	defer db.Close()
	var events []Event
	db.Raw(`select * from events where deleted_at is null`).Scan(&events)
	return events
}

// GetOneEvent retrieves and returns data for a specific event
func (e *Event) GetOneEvent() Event {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on retrieving single event: %v", err)
	}
	defer db.Close()
	var event Event
	db.Raw(`select * from events where event_id = ? and deleted_at is null`, e.EventID).Scan(&event)
	return event
}

// UpdateEvent modifies an existing event
func (e *Event) UpdateEvent(updatedEvent Event) (*gorm.DB, error) {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on updating event: %v", err)
	}
	defer db.Close()
	var event Event
	db.Raw(`select * from events where event_id = ?`, e.EventID).Scan(&event)
	if updatedEvent.Owners != "" {
		event.Owners = updatedEvent.Owners
	}
	if updatedEvent.Title != "" {
		event.Title = updatedEvent.Title
	}
	if updatedEvent.Interests != "" {
		event.Interests = updatedEvent.Interests
	}
	if updatedEvent.Desc != "" {
		event.Desc = updatedEvent.Desc
	}
	if !updatedEvent.DateAndTime.IsZero() {
		event.DateAndTime = updatedEvent.DateAndTime
	}
	if updatedEvent.Location != "" {
		event.Location = updatedEvent.Location
	}
	if updatedEvent.RSVPs != "" {
		event.RSVPs = updatedEvent.RSVPs
	}
	// Return unchanged *gorm.DB if any fields are empty
	if updatedEvent.Owners == "" ||
		updatedEvent.Title == "" ||
		updatedEvent.Interests == "" ||
		updatedEvent.Desc == "" ||
		updatedEvent.DateAndTime.IsZero() ||
		updatedEvent.Location == "" ||
		updatedEvent.RSVPs == "" {
		err := errors.New("error updating record: some or all fields are empty")
		return db, err
	}
	return db.Save(&event), nil
}

// DeleteEvent removes the event from the db
func (e *Event) DeleteEvent() *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Printf("Error initalizing database on deleting event: %v", err)
	}
	defer db.Close()
	return db.Delete(&e)
}
