import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import UseForm from '../hooks/UseForm';
import interests from '../interests.json';

const AddEvent = () => {
    const {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit
    } = UseForm(() => {
        console.log(inputs)

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
                            <input className="form-check-input" type="checkbox" onChange={e => handleCheckboxSelection(e)} id={id} value={name} />
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