import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import pic from '../images/pic.png';
import UseForm from '../hooks/UseForm';

const ProfileForm = () => {
    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        console.log("profile set up form submitted")
    }, 'profile');
    return (
        <ContentContainer color="white">
            <div className="container">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="row">
                        {/* Title and form fields */}
                        <div className="col-md-6">
                        <h2 className="title">
                            Complete your profile...
                        </h2>
                            <div className="form-group">
                                <input className="profile-field" onChange={e => handleInputChange(e)} value={inputs.nickName} name="nickName" type="text" placeholder="nick name" aria-label="nickName" />
                            </div>
                            <div className="form-group">
                                <input className="profile-field" onChange={e => handleInputChange(e)} value={inputs.location} name="location" type="text" placeholder="location" aria-label="location" />
                            </div>
                        </div>
                        {/* Profile avatar*/}
                        <div className="col-md-6">
                            <img className="avatar" src={pic} alt="pic" />
                        </div>
                    </div>
                    <div className="row">
                        {/* Submit button  */}
                        <div className="col-md-10"></div>
                        <div className="col-md-2 text-center profile-set-up">
                            <Button type="submit">Next</Button>
                        </div>
                    </div>
                </form>
            </div>
        </ContentContainer>
    )
}

export default ProfileForm;