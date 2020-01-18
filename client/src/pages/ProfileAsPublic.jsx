import React from 'react';
import Heading from '../components/Heading';
import UseProfile from '../hooks/UseOneProfile';
import moment from 'moment';

const ProfileAsPublic = props => {
    const id = props.match.params.id;
    const {
        CreatedAt,
        DisplayName,
        Location,
        Interests,
        UserID,
    } = UseProfile(id);
    // importing profile image to display from user id
    let image = '';
    if (UserID) image = require(`../user_images/user-${UserID}.png`);
    // formatting date
    const date = moment(CreatedAt).format('MMMM Do YYYY');
    
    return (
        <div>
            <Heading id={0} navType="loggedOut" />
            <section className="border-only container profile-container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row profile-info">
                            <span className="profile-label">Display name:</span> {DisplayName}   
                        </div>
                        <div className="row profile-info">
                            <span className="profile-label">Date Joined:</span> {date}
                        </div>
                        <div className="row profile-info">
                            <span className="profile-label">Location:</span> {Location}
                        </div>
                        <div className="row profile-info">
                            <span className="profile-label">Interests:</span> {Interests ? Interests.split(",").join(" • ") : null}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img alt="user" src={image} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileAsPublic;