import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import Alert from '../components/ValidationAlert';
import Heading from './Heading';
import UseForm from '../hooks/UseForm';
import UseValidator from '../hooks/UseValidator';
import interests from '../interests.json';
import API from '../utils/API';
import moment from 'moment';
import validate from '../utils/validate';

const AddEvent = props => {
    const {
        validInputs,
        invalidateInputs,
    } = UseValidator();

    const userID = props.match.params.userID;

    const {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit,
    } = UseForm(() => {
        const { title, desc, location, date, time, relatedInterests } = inputs;
        // modify interests and date & time to meet requirements of back end model
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
            // add event to db, alert user on success or if an error occurred
            API
              .addEvent(newEvent)
              .then(res => {
                if (res.status === 201) {
                    alert("Congrats! Your event has been created.")
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
    }, 'add event')
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <ContentContainer color="white">
                {validInputs ? null : <Alert>Uh oh! Some of the required information hasn't been submitted. Please double check all required fields.</Alert>}
                <h4 className="title text-center">add an event</h4>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* title */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.title} name="title" type="text" placeholder="event title" aria-label="title" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* description */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.desc} name="desc" type="text" placeholder="event description" aria-label="desc" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* date */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.date} name="date" type="date" aria-label="date" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* time */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.time} name="time" type="time" aria-label="time" />
                        <span className="required-sm">*required</span>
                    </div>
                    {/* location */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.location} name="location" type="text" placeholder="location" aria-label="location" />
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
                                    <input className="form-check-input" type="checkbox" onChange={e => handleCheckboxSelection(e, inputs.relatedInterests)} id={id} value={name} />
                                    <label className="form-check-label" htmlFor={id} >{name}</label>
                                </div>
                            )
                        })
                    }
                    <br />
                    <Button type="submit">Go</Button>
                </form>  
            </ContentContainer>
        </div>
    )
}

export default AddEvent;