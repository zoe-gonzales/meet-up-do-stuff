import React from 'react';
import { Redirect } from 'react-router-dom';
import InterestSelector from '../components/InterestSelector';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Button';
import interests from '../interests.json';
import UseForm from '../hooks/UseForm';
import UseRedirect from "../hooks/UseRedirect";
import API from '../utils/API';

const InterestsAdder = props => {
    const userID = props.match.params.id;
    const {
        redirect,
        redirectPage,
        id,
    } = UseRedirect();

    const { inputs, handleInterestSelected, handleSubmit } = UseForm(() => {
        const data ={
            DisplayName: localStorage.getItem("nickName"),
            Location: localStorage.getItem("location"),
            Interests: inputs.interests.join(","),
            AdminOf: '---',
            MemberOf: '---',
            RSVPS: '---',
        }

        API.updateProfile(userID, data)
            .then(res => {
                if (res.status === 200) {
                    localStorage.clear()
                    redirectPage(userID)
                }
            })
            .catch(err => console.log(err));
    }, 'profile');

    return (
        <ContentContainer color="white">
            {redirect ? <Redirect to={`/profile/${id}`} /> : null}
            {interests.map(interest => <InterestSelector value={interest.name} key={interest.id} interest={interest} onClick={e => handleInterestSelected(e, inputs.interests)} /> )}
            <hr />
            <h5>Your Interests</h5>
            {inputs.interests.map(selectedInterest => <div key={selectedInterest}>{selectedInterest}</div> )}
            <form onSubmit={e => handleSubmit(e)}>
                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-2">
                        <Button type="submit">Finish</Button>
                    </div>
                    <div className="col-sm-5"></div>
                </div>
            </form>
        </ContentContainer>
    )
}

export default InterestsAdder;