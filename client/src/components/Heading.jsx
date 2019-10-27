import React from 'react';
import background from '../images/background.jpg';
import Button from './Button';
import styled from "styled-components";

const Field = styled.input`
    border: 1px solid #778899;
    margin-top: 3rem;
    :focus {
        background-color: #DBEFFF;
    }
    ::placeholder {
        font-size: .9rem;
        padding: 8px;
    }
`

const Wrapper = styled.div`
    width: 30%;
    margin: auto;

`

const Heading = () => {
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4 text-center">Find your next meeting</h1>
                <form /*onSubmit={e => handleSubmit(e)}*/>
                    <Wrapper className="input-group mb-3 lead text-center">
                        <Field /*onChange={e => handleInputChange(e)} value={inputs.zipcode}*/ name="zipcode" type="text" className="form-control rounded-0" placeholder="Search events by zip code" aria-label="Search events by zip code" />
                        <div className="input-group-append">
                            <Button type="submit">Go</Button>
                        </div>
                    </Wrapper>
                </form>  
            </div>
        </div>
    )
}

export default Heading;