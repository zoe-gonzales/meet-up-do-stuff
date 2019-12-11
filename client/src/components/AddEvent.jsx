import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import UseForm from '../hooks/UseForm';
import interests from '../interests.json';
import API from '../utils/API';
import moment from 'moment';

const AddEvent = () => {
    const {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit,
    } = UseForm(() => {
        // retrieve inputs 
        const { title, desc, location, date, time, relatedInterests } = inputs;

        // modify interests and date & time to meet requirements of back end model
        const interests = relatedInterests.join(",");
        const dt = `${date}T${time}:00`;
        const formattedDT = moment(dt).format();
        
        const newEvent = {
            Title: title,
            Interests: interests,
            Desc: desc,
            DateAndTime: formattedDT,
            Location: location,
            RSVPs: '',
        }
        
        // add event to db, alert user on success or if an error occurred
        API
          .addEvent(newEvent)
          .then(res => {
              if (res.status === 201) {
                  alert("Congrats! Your event has been created.")
              }
          })
          .catch(err => {
              alert("There was an error processing your request. Please try again.")
              console.log(err)
          });

    }, 'add event')
    return (
        <ContentContainer color="white">
        <h4 className="title text-center">add an event</h4>
        <form onSubmit={e => handleSubmit(e)}>
            {/* title */}
            <div className="form-group">
                <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.title} name="title" type="text" placeholder="event title" aria-label="title" />
            </div>
            {/* description */}
            <div className="form-group">
                <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.desc} name="desc" type="text" placeholder="event description" aria-label="desc" />
            </div>
            {/* date */}
            <div className="form-group">
                <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.date} name="date" type="date" aria-label="date" />
            </div>
            {/* time */}
            <div className="form-group">
                <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.time} name="time" type="time" aria-label="time" />
            </div>
            {/* location */}
            <div className="form-group">
                <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.location} name="location" type="text" placeholder="location" aria-label="location" />
            </div>
            {/* related interests */}
            <p>Related Interests</p>
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
    )
}

export default AddEvent;