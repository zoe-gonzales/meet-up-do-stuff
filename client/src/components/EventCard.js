import React from "react";
import styled from "styled-components";

// to be styled
const EventContents = styled.div`
    
`

const Title = styled.div`
    font-weight: bold;

`
const Link = styled.a`
    margin-top: 10px;
    font-size: .75rem;
`

const EventCard = ({ event }) => {
    return (
        <EventContents className="card-body">
            <Title className="card-title">{event.title}</Title>
            <div className="card-text">{event.description}</div>
            <Link href={event.path} className="btn btn-danger">More</Link>
        </EventContents>
    )
}

export default EventCard;