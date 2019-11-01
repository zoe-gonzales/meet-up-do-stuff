import React from "react";
import ContentContainer from './ContentContainer';

const SmallEventCard = ({ event, background }) => {
    return (
        <ContentContainer color={background} className="card-body">
            <div className="event-title card-title">{event.title}</div>
            <div className="card-text">{event.description}</div>
            <a href={event.path} className="link btn btn-danger">More</a>
        </ContentContainer>
    )
}

export default SmallEventCard;