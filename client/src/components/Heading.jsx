import React from 'react';
import background from '../images/doodles.png';
import Button from './Button';
import Nav from './Nav';
import UseForm from '../hooks/UseForm';

const Heading = ({ navType, id }) => {
    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        console.log("search submitted")
    }, 'search');

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="jumbotron jumbotron-fluid">
            <Nav navType={navType} id={id} />
            <div className="container">
                <h1 className="display-4 text-center">Find your next meeting</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="wrapper input-group mb-3 lead text-center">
                        <input onChange={e => handleInputChange(e)} value={inputs.zipCode} name="zipCode" type="text" className="field form-control border-secondary rounded-0" placeholder="Search events by zip code" aria-label="Search events by zip code" />
                        <div className="input-group-append">
                            <Button type="submit">Go</Button>
                        </div>
                    </div>
                </form>  
            </div>
        </div>
    )
}

export default Heading;