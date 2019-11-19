import React from 'react';
import Heading from '../components/Heading';
import ProfileForm from '../components/ProfileForm';

const ProfileCreator = () => {
    // Need profile id within path params in order to update
    return (
        <div>
            <Heading />
            <ProfileForm />
        </div>
    )
}

export default ProfileCreator;