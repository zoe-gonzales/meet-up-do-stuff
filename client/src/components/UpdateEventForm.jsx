import React from 'react';
import { Redirect } from 'react-router-dom';
import ContentContainer from './ContentContainer';
import Button from './Button';
import Alert from '../components/ValidationAlert';
import Heading from './Heading';
import UseValidator from '../hooks/UseValidator';
import UseOneEvent from '../hooks/UseOneEvent';
import UseEventUpdateForm from '../hooks/UseEventUpdateForm';
import UseRedirectLocally from '../hooks/UseRedirectLocally';
import interests from '../interests.json';
import API from '../utils/API';
import moment from 'moment';
import validate from '../utils/validate';

const UpdateEvent = props => {
    const {
        validInputs,
        invalidateInputs,
    } = UseValidator();

    const {
        redirect,
        redirectPage,
    } = UseRedirectLocally();

    const userID = props.match.params.userID;
    const eventID = props.match.params.eventID;
    const event = UseOneEvent(eventID);
    
    const {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit,
    } = UseEventUpdateForm(event, () => {
        const { title, desc, location, date, time, relatedInterests } = inputs;
        const interests = relatedInterests.join(",");
        const dt = `${date}T${time}:00`;
        const formattedDT = moment(dt).format();
        const newEvent = {
            Owners: userID,
            Title: title,
            Interests: interests,
            Desc: desc,
            DateAndTime: formattedDT,
            Location: location,
            RSVPs: '---',
        }
        
        if (
            validate.string(newEvent.Title) &&
            validate.string(newEvent.Interests) &&
            validate.string(newEvent.Desc) &&
            validate.date(newEvent.DateAndTime) &&
            validate.string(newEvent.Location)
        ) {
            API
              .updateEvent(eventID, newEvent)
              .then(res => {
                if (res.status === 200) {
                    alert("Congrats! Your event has been successfully updated.")
                    redirectPage()
                }
              })
              .catch(err => {
                if (err.response.status) {
                    alert(`
                        Log in credentials are required for this action.
                        Please log in or sign up and try again.`)
                }
              });
        } else invalidateInputs()
    })

    return (
        <div>
            {redirect ? <Redirect to={`/user/${userID}/alterevents`} /> : null}
            <Heading id={userID} navType="loggedIn" />
            <ContentContainer color="white">
                {validInputs ? null : <Alert>Uh oh! Some of the required information hasn't been submitted. Please double check all required fields.</Alert>}
                <h4 className="title text-center">update event</h4>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* title */}
                    <div className="form-group">
                        <input alt="input" className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.title} name="title" type="text" aria-label="title" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* description */}
                    <div className="form-group">
                        <textarea className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.desc} name="desc" type="text" aria-label="desc" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* date */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.date} name="date" type="date" aria-label="date" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* time */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.time} name="time" type="time" aria-label="time" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* location */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} defaultValue={inputs.location} name="location" type="text" aria-label="location" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* related interests */}
                    <p>
                        Related Interests
                        <span className="required-sm">*minimum 1 interest required</span>
                    </p>
                    {
                        interests.map(interest => {
                            const { id, name } = interest;
                            return (
                                <div className="form-check form-check-inline" key={id}>
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={e => handleCheckboxSelection(e, inputs.relatedInterests)}
                                        
                                        id={id}
                                        defaultValue={name}
                                        checked={
                                            inputs.relatedInterests ?
                                            inputs.relatedInterests.includes(name) :
                                            false
                                        }
                                    />
                                    <label className="form-check-label" htmlFor={id} >{name}</label>
                                </div>
                            )
                        })
                    }
                    <br />
                    <Button type="submit">Update</Button>
                </form>  
            </ContentContainer>
        </div>
    )
}

export default UpdateEvent;