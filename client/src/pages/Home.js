import React from 'react';
import Event from '../components/SmallEventCard';
import UseEvents from '../hooks/UseEvents';

const colors = ['#FFC5AB', '#ffd965', '#E8E151', '#ADA6FF'];

const HomePage = () => {
    const events = UseEvents();
    return (
        <div className="container flex-container">
            { events ? 
                events.map(event => {
                    const details = {
                        title: event.Title,
                        description: event.Desc,
                        path: `/events/${event.ID}`
                    }
                    return (
                        <Event 
                            key={event.ID}
                            event={details}
                            background={colors[Math.floor(Math.random() * colors.length)]}
                        />
                    )
                })
             : null
            }
        </div>
    )
}

export default HomePage;