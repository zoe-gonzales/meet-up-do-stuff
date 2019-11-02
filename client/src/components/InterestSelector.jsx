import React from "react";

const InterestSelector = ({ interest }) => {
    return <button type="button" className="interest-selector btn btn-secondary" data-id={interest.id}>{interest.name}</button>;

}

export default InterestSelector;