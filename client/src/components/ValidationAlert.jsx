import React from 'react';

const ValidationAlert = ({ children }) => {
    return <div className="alert alert-info" role="alert">{children}</div>;
}

export default ValidationAlert;