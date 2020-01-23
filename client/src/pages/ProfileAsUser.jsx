import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ContentContainer from '../components/ContentContainer';
import InterestSelector from '../components/InterestSelector';
import UseProfile from '../hooks/UseOneProfile';
import UseProfileUpdateForm from '../hooks/UseProfileUpdateForm';
import API from '../utils/API';
import interests from '../interests.json';
import moment from 'moment';

const ProfileAsUser = props => {
    const userID = props.match.params.userID;
    const profile = UseProfile(userID);
    const {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit,
    } = UseProfileUpdateForm(profile, () => {
        const newProfile = {...profile}
        const { DisplayName, Location, Interests } = inputs;
        newProfile.DisplayName = DisplayName;
        newProfile.Location = Location;
        newProfile.Interests = Interests.join(',');

        API
          .updateProfile(userID, newProfile)
          .then(res => {
              if (res.status === 200) {
                alert('Your profile has been successfully updated!')
              }
          })
          .catch(err => {
            console.log(err)
            alert('An error occurred updating your record. Please try again later')
          })
    })
    
    const { UserID, CreatedAt } = profile;
    
    let image = '';
    if (UserID) image = require(`../user_images/user-${UserID}.png`);
    
    const date = moment(CreatedAt).format('MMM Do YYYY');
    
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <h4 className="title text-center">my profile</h4>
            <ContentContainer color="white">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-md-6">
                            {/* display name */}
                            <div className="form-group">
                                <input className="profile-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.DisplayName} name="DisplayName" type="text" aria-label="display name" />
                                <span className="required-sm">*required</span>
                            </div>
                            {/* location */}
                            <div className="form-group">
                                <input className="profile-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.Location} name="Location" type="text" aria-label="Location" />
                                <span className="required-sm">*required</span>
                            </div>
                        </div>
                        {/* avatar */}
                        <div className="col-md-6">
                            <img className="avatar" src={image} alt="pic" />
                            <p>Joined on: {date}</p>
                        </div>
                    </div>
                    <div className="text-center" style={{ marginTop: '1rem' }}>
                        <h4>select interests</h4>
                        {
                            interests.map(interest => <InterestSelector value={interest.name} key={interest.id} interest={interest} onClick={e => handleCheckboxSelection(e, inputs.Interests)} />)
                        }
                    </div>
                    <div className="text-center" style={{ marginTop: '2rem' }}>
                        <h4>current interests</h4>
                        {
                            inputs.Interests ? (
                                inputs.Interests.map(selectedInterest => <div key={inputs.Interests.indexOf(selectedInterest)}>{selectedInterest}</div> )
                            ) : null
                        }
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