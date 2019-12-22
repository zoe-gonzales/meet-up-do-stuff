import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import InterestSelector from '../components/InterestSelector';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Button';
import Alert from '../components/ValidationAlert';
import interests from '../interests.json';
import UseForm from '../hooks/UseForm';
import UseRedirect from "../hooks/UseRedirect";
import UseValidator from '../hooks/UseValidator';
import API from '../utils/API';
import validate from '../utils/validate';

const InterestsAdder = props => {
    const userID = props.match.params.id;
    const {
        redirect,
        redirectPage,
        id,
    } = UseRedirect();

    const {
        validInputs,
        invalidateInputs,
    } = UseValidator();

    const { inputs, handleInterestSelected, handleSubmit } = UseForm(() => {
        const data ={
            DisplayName: localStorage.getItem("nickName"),
            Location: localStorage.getItem("location"),
            Interests: inputs.interests.join(","),
            AdminOf: '---',
            MemberOf: '---',
            RSVPS: '---',
        }
        
        if (validate.value(data.DisplayName) &&
            validate.value(data.Location) &&
            validate.string(data.Interests)) 
            {
                API.updateProfile(userID, data)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.clear()
                        redirectPage(userID)
                    }
                })
                .catch(err => console.log(err));
            } else {
                invalidateInputs()
            }
        
    }, 'profile');

    return (
        <ContentContainer color="white">
            {validInputs ? null : <Alert>Uh oh! Some of the required information hasn't been submitted. Please double check all required fields.</Alert>}
            {redirect ? <Redirect to={`/profile/${id}`} /> : null}
            {interests.map(interest => <InterestSelector value={interest.name} key={interest.id} interest={interest} onClick={e => handleInterestSelected(e, inputs.interests)} /> )}
            <hr />
            <h5>
                Your Interests
                <span className="required-sm">*minimum 1 interest required</span>
            </h5>
            {inputs.interests.map(selectedInterest => <div key={selectedInterest}>{selectedInterest}</div> )}
            <form onSubmit={e => handleSubmit(e)}>
                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-2">
                        <Button type="submit">Finish</Button>
                        <Link className="square-btn next-btn" to={`/createprofile/${userID}`}>Back</Link>
                    </div>
                    <div className="col-sm-5"></div>
                </div>
            </form>
        </ContentContainer>
    )
}

export default InterestsAdder;