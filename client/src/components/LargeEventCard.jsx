import React from 'react';
import styled from 'styled-components';

const Border = styled.div`
    border: 1px solid #778899;
`

const Heading = styled.section`
    background-color: #DBEFFF;
    padding: 20px;
`
const Content = styled.section`
    padding: 20px;
`

const LargeEventCard = ({ event }) => {
    return (
        <Border>
            <Heading>
                <h4>{event.title}</h4>
                <p>{event.dateTime}</p>
                <p>{event.location}</p>
            </Heading>
            <Content>
                <p>{event.description}</p>
            </Content>
        </Border>
    )
}

export default LargeEventCard;