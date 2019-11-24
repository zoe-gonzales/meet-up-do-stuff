import React from 'react';
import pic from '../images/pic.png';

const UserProfile = () => {
    return (
        <section className="border-only container profile-container">
            <div className="row">
                <div className="col-md-8">
                    <div className="row profile-info">
                        <span className="profile-label">Display name:</span> z_gonzales   
                    </div>
                    <div className="row profile-info">
                        <span className="profile-label">Email:</span> z_gonzales@fakemail.com
                    </div>
                    <div className="row profile-info">
                        <span className="profile-label">Location:</span> Denver, CO
                    </div>
                    <div className="row profile-info">
                        <span className="profile-label">Interests:</span> Books, Music, Shows, Coding, Web Development, Design
                    </div>
                </div>
                <div className="col-md-4">
                    <img alt="user" src={pic} />
                </div>
            </div>
        </section>
    )
}

export default UserProfile;