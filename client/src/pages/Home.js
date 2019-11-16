import React from 'react';
import Heading from '../components/Heading';
import Event from '../components/SmallEventCard';

const colors = ['#4766AB', '#6B9AFF', '#CC5841', '#FFC5AB', '#DBEFFF'];

const HomePage = ({ events }) => {
    return (
        <div>
            <Heading />
            <div className="container flex-container">
                {events.map(event => {
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
        </div>
    )
}

export default HomePage;