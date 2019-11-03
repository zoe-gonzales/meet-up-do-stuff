import React from 'react';

const LargeEventCard = ({ event }) => {
    return (
        <div className="border-only">
            <section className="heading">
                <h4>{event.title}</h4>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
            </section>
            <section className="content">
                <p>{event.description}</p>
            </section>
        </div>
    )
}

export default LargeEventCard;