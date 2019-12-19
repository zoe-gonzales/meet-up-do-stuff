import React from 'react';
import InterestSelector from '../components/InterestSelector';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Button';
import interests from '../interests.json';
import UseForm from '../hooks/UseForm';
import API from '../utils/API';

const InterestsAdder = props => {
    const id = props.match.params.id;

    const { inputs, handleInterestSelected, handleSubmit } = UseForm(() => {
        const data ={
            DisplayName: localStorage.getItem("nickName"),
            Location: localStorage.getItem("location"),
            Interests: inputs.interests,
            PathToImg: 'na',
            AdminOf: 'na',
            MemberOf: 'na',
            RSVPS: 'na',
        }

        API
          .getUserByID(id)
          .then(res => {
              const email = res.data.Email;
              API.updateProfile(email, data)
                .then(res => console.log(res))
                .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
    }, 'profile');

    return (
        <ContentContainer color="white">
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