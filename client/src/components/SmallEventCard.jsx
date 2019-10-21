import React from "react";
import ContentContainer from './ContentContainer';
import styled from "styled-components";

const Title = styled.div`
    font-weight: bold;
`
const Link = styled.a`
    margin-top: 10px;
    font-size: .75rem;
`

const SmallEventCard = ({ event, background }) => {
    return (
        <ContentContainer color={background} className="card-body">
            <Title className="card-title">{event.title}</Title>
            <div className="card-text">{event.description}</div>
            <Link href={event.path} className="btn btn-danger">More</Link>
        </ContentContainer>
    )
}

export default SmallEventCard;