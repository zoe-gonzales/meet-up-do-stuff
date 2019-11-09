package test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/zoe-gonzales/meet-up-do-stuff/user"
)

func TestShouldCreateNewEvent(t *testing.T) {
	event := user.Event{
		Owners:      "1, 2",
		Title:       "best event ever",
		Interests:   "interest1, interest2",
		Desc:        "a really cool event",
		DateAndTime: time.Now(),
		Location:    "Denver, CO",
		RSVPs:       "1, 2, 3, 4",
	}
	record := event.CreateEvent()
	rowsAffected := record.RowsAffected
	var affected int64 = 1
	assert.Equal(t, affected, rowsAffected)
	e := &event
	e.DeleteEvent()
}

func TestShouldUpdateEvent(t *testing.T) {
	var tests = []struct {
		name         string
		updatedEvent user.Event
	}{
		{
			name: "full_update",
			updatedEvent: user.Event{
				Owners:      "1,2",
				Title:       "Coolest Event Ever",
				Interests:   "mountains, hiking, video games",
				Desc:        "This is a cool event",
				Location:    "Denver, CO 80210",
				DateAndTime: time.Now(),
				RSVPs:       "1,2,3,4,5",
			},
		},
		{
			name: "partial_update",
			updatedEvent: user.Event{
				Title: "Coolest Event Ever",
				Desc:  "This is a cool event",
				RSVPs: "1,2,3,4,5",
			},
		},
		{
			name:         "no_update",
			updatedEvent: user.Event{},
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			event := user.Event{
				Owners:    "1",
				Title:     "A cool event",
				Interests: "mountains, hiking",
				Desc:      "You'll like this cool event",
				Location:  "Denver, CO",
				RSVPs:     "1,2,3",
			}
			event.CreateEvent()
			e := &event
			record, err := e.UpdateEvent(tc.updatedEvent)
			rowsAffected := record.RowsAffected
			switch c := tc.name; c {
			case "full_update":
				assert.Equal(t, rowsAffected, int64(1))
			case "partial_update":
				assert.Error(t, err)
			case "no_update":
				assert.Error(t, err)
			}
			e.DeleteEvent()
		})
	}
}

func TestShouldGetEvent(t *testing.T) {

}

func TestShouldDeleteEvent(t *testing.T) {

}
