import React from 'react';
import Heading from '../components/Heading';

const LoggedOut = () => {
    return (
        <div>
            <Heading id={0} navType="loggedOut" />
            <p className="text-center">You have been successfully logged out.</p>
        </div>
    );
}

export default LoggedOut;