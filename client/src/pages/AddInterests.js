import React from 'react';
import Heading from '../components/Heading';
import InterestSelector from '../components/InterestSelector';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Button';
import interests from '../interests.json';

const InterestsAdder = () => {
    // Need profile id within path params in order to update
    return (
        <div>
            <Heading />
            <ContentContainer color="white">
                {interests.map(interest => {
                    return <InterestSelector key={interest.id} interest={interest} />
                })}
                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-2">
                        <Button>Finish</Button>
                    </div>
                    <div className="col-sm-5"></div>
                </div>
            </ContentContainer>
        </div>
    )
}

export default InterestsAdder;