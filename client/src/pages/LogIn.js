import React from 'react';
import Heading from '../components/Heading';
import LogInForm from '../components/SignInForm';

const LogInPage = () => {
    return (
        <div>
            <Heading />
            <div>
                <LogInForm style={{alignItems: 'center' }} />
            </div>
        </div>
    )
}

export default LogInPage;