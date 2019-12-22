import React from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from './ContentContainer';
import Button from './Button';
import UseForm from '../hooks/UseForm';

const importAll = c => {
    let imgs = {}
    c.keys().forEach(image => {imgs[image.replace('./', '')] = c(image); });
    return imgs
}

const ProfileForm = props => {
    const profileID = props.match.params.id;
    const images = importAll(require.context('../user_images/', false, /\.(png)$/));

    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        const { nickName, location } = inputs;
        localStorage.setItem("nickName", nickName);
        localStorage.setItem("location", location);
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
                                <input className="profile-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.nickName} name="nickName" type="text" placeholder="nick name" aria-label="nickName" />
                            </div>
                            <div className="form-group">
                                <input className="profile-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.location} name="location" type="text" placeholder="location" aria-label="location" />
                            </div>
                        </div>
                        {/* Profile avatar*/}
                        <div className="col-md-6">
                            <img className="avatar" src={images[`user-${profileID}.png`]} alt="pic" />
                        </div>
                    </div>
                    <div className="row">
                        {/* Submit button  */}
                        <div className="col-md-5"></div>
                        <div className="col-md-2 text-center" style={{ marginTop: 20 }}>
                            <Button type="submit">Save</Button>
                            <Link to={`/createinterests/${profileID}`}>Next</Link>
                        </div>
                        <div className="col-md-5"></div>
                    </div>
                </form>
            </div>
        </ContentContainer>
    )
}

export default ProfileForm;