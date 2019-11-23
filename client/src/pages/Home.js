import React from 'react';
import Event from '../components/SmallEventCard';
import UseEvents from '../hooks/UseEvents';

const colors = ['#FFC5AB', '#ffd965', '#E8E151', '#ADA6FF'];

const HomePage = ({ events2 }) => {
    const events = UseEvents();
    console.log(events)

    return (
        <div className="container flex-container">
            {events2.map(event => {
                const details = {
                    title: event.title,
                    description: event.description,
                    path: event.path
                }
                return (
                    <Event 
                        key={event.id}
                        event={details}
                        background={colors[Math.floor(Math.random() * colors.length)]}
                    />
                )
            })}
        </div>
    )
}

export default HomePage;