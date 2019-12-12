import React from "react";

const InterestSelector = ({
    interest,
    onClick,
    value
}) => {
    return <button value={value} type="button" className="interest-selector btn btn-secondary" data-id={interest.id} onClick={onClick}>{interest.name}</button>;
}

export default InterestSelector;