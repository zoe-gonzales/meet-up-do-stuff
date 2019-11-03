package user

import (
	"log"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/zoe-gonzales/meet-up-do-stuff/db"
)

// Event type holds information about an individual event
type Event struct {
	gorm.Model
	Owners      []int // issue with slices in psql
	Title       string
	Interests   []string // issue with slices in psql
	Desc        string
	DateAndTime time.Time
	Location    string
	RSVPs       []int // issue with slices in psql
}

// CreateEvent generates a new event and saves to db
func (e Event) CreateEvent() *gorm.DB {
	// potentially add validation on back end
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on creating event", err)
	}
	defer db.Close()
	return db.Create(&e)
}

// GetAllEvents retrieves and returns all current or upcoming events
func GetAllEvents() []Event {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on retrieving single event", err)
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
		log.Fatal("Error initalizing database on retrieving single event", err)
	}
	defer db.Close()
	var event Event
	db.Raw(`select * from events where event_id = ? and deleted_at is null`, e.ID).Scan(&event)
	return event
}

// UpdateEvent modifies an existing event
func (e *Event) UpdateEvent(updatedEvent Event) *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on updating event", err)
	}
	defer db.Close()
	var event Event
	db.Raw(`select * from events where event_id = ?`, e.ID).Scan(&event)
	if len(updatedEvent.Owners) != len(event.Owners) {
		event.Owners = updatedEvent.Owners
	}
	if updatedEvent.Title != event.Title {
		event.Title = updatedEvent.Title
	}
	if len(updatedEvent.Interests) != len(event.Interests) {
		event.Interests = updatedEvent.Interests
	}
	if updatedEvent.Desc != event.Desc {
		event.Desc = updatedEvent.Desc
	}
	// need to consider if time.Time is the best time here - how to implement on front end
	if updatedEvent.DateAndTime != event.DateAndTime {
		event.DateAndTime = updatedEvent.DateAndTime
	}
	if updatedEvent.Location != event.Location {
		event.Location = updatedEvent.Location
	}
	// issue if two users rsvp/unrsvp at the same time - may need a more detailed check
	if len(updatedEvent.RSVPs) != len(event.RSVPs) {
		event.RSVPs = updatedEvent.RSVPs
	}
	return db.Save(&event)
}

// DeleteEvent removes the event from the db
func (e *Event) DeleteEvent() *gorm.DB {
	db, err := db.Init()
	if err != nil {
		log.Fatal("Error initalizing database on deleting event", err)
	}
	defer db.Close()
	var event Event
	return db.Raw(`delete from events where event_id = ? and deleted_at is null`, e.ID).Scan(&event)
}
