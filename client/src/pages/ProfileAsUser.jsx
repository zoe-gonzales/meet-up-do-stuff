import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ContentContainer from '../components/ContentContainer';
import InterestSelector from '../components/InterestSelector';
import UseProfile from '../hooks/UseOneProfile';
import interests from '../interests.json';

import moment from 'moment';

const ProfileAsUser = props => {
    const userID = props.match.params.userID;
    const {
        CreatedAt,
        DisplayName,
        Location,
        Interests,
        UserID,
    } = UseProfile(userID);
    let image = '';
    if (UserID) image = require(`../user_images/user-${UserID}.png`);
    const date = moment(CreatedAt).format('MMM Do YYYY');
    let interestsList = [] 
    if (Interests) interestsList = Interests.split(",")
    
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <ContentContainer color="white">
                <form /*onSubmit={e => handleSubmit(e)}*/>
                    <div className="row">
                        <div className="col-md-6">
                            {/* display name */}
                            <div className="form-group">
                                <input className="profile-field form-control border-secondary rounded-0" /*onChange={e => handleInputChange(e)}*/ defaultValue={DisplayName} name="nickName" type="text" placeholder="nick name" aria-label="nickName" />
                                <span className="required-sm">*required</span>
                            </div>
                            {/* location */}
                            <div className="form-group">
                                <input className="profile-field form-control border-secondary rounded-0" /*onChange={e => handleInputChange(e)}*/ defaultValue={Location} name="location" type="text" placeholder="location" aria-label="location" />
                                <span className="required-sm">*required</span>
                            </div>
                        </div>
                        {/* avatar */}
                        <div className="col-md-6">
                            <img className="avatar" src={image} alt="pic" />
                            <p>Joined on: {date}</p>
                        </div>
                        <div>
                            <h4 className="text-center">Interests</h4>
                            {interests.map(interest => <InterestSelector value={interest.name} key={interest.id} interest={interest} /*onClick={e => handleInterestSelected(e, inputs.interests)}*/ /> )}
                        </div>
                        <div>
                            {
                                interestsList.map(selectedInterest => <div key={interestsList.indexOf(selectedInterest)}>{selectedInterest}</div> )
                            }
                        </div>
                    </div>
                    <div className="row">
                        {/* save changes  */}
                        <div className="col-md-5"></div>
                        <div className="col-md-2 text-center" style={{ marginTop: 20 }}>
                            <Button type="submit">Save</Button>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                </form>
            </ContentContainer>
        </div>
    )
}

export default ProfileAsUser;