import React from 'react';
import Heading from '../components/Heading';

const NotFound = () => {
    return (
        <div>
            <Heading id={0} navType="loggedOut" />
            <p className="text-center">The page you're looking could not be found.</p>
        </div>
    );
}

export default NotFound;