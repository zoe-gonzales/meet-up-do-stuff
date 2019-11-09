package main

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
	event := user.Event{
		Owners:      "1, 2, 3",
		Title:       "An outdoors event",
		Interests:   "outdoors, nature, hiking",
		Desc:        "We're going on a hike!",
		DateAndTime: time.Now(),
		Location:    "Boulder, CO",
		RSVPs:       "1, 2, 3, 4, 6, 9, 10",
	}
	var newEvent user.Event
	r := event.CreateEvent().Scan(&newEvent)
	if r.RowsAffected == int64(1) {
		e := &newEvent
		record := e.GetOneEvent()
		assert.Equal(t, event.Owners, record.Owners)
		assert.Equal(t, event.Title, record.Title)
		assert.Equal(t, event.Interests, record.Interests)
		assert.Equal(t, event.Desc, record.Desc)
		assert.Equal(t, event.Location, record.Location)
		assert.Equal(t, event.RSVPs, record.RSVPs)
	}
	(&newEvent).DeleteEvent()
}

func TestShouldDeleteEvent(t *testing.T) {
	event := user.Event{
		Owners:      "1, 2, 3",
		Title:       "An outdoors event",
		Interests:   "outdoors, nature, hiking",
		Desc:        "We're going on a hike!",
		DateAndTime: time.Now(),
		Location:    "Boulder, CO",
		RSVPs:       "1, 2, 3, 4, 6, 9, 10",
	}
	var newEvent user.Event
	e := &newEvent
	event.CreateEvent().Scan(e)
	e.DeleteEvent()
	record := e.GetOneEvent()
	assert.Equal(t, record.Owners, "")
	assert.Equal(t, record.Title, "")
	assert.Equal(t, record.Interests, "")
	assert.Equal(t, record.Desc, "")
	assert.Equal(t, record.Location, "")
	assert.Equal(t, record.RSVPs, "")
}
