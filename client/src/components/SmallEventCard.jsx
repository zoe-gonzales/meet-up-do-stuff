import React from "react";

const SmallEventCard = ({ event, background }) => {
    return (
        <div style={{ backgroundColor: background }} className="card-body border-only flex-item">
            <div className="event-title card-title">{event.title}</div>
            <div className="card-text">{event.description}</div>
            <a href={event.path} className="link btn btn-danger">More</a>
        </div>
    )
}

export default SmallEventCard;