import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import styled from 'styled-components';
import UseForm from '../hooks/UseForm';

const Field = styled.input`
    border: 1px solid #778899;
    padding: 5px;
    width: 100%;
    :focus {
        background-color: #DBEFFF;
    }
`

const Title = styled.h4`
    margin: 15px 0;
`

const SignInForm = () => {
    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        console.log("sign in form submitted")
    }, 'auth');

    return (
        <ContentContainer color="white">
            <Title className="text-center">sign in</Title>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <Field onChange={e => handleInputChange(e)} value={inputs.username} name="username" type="text" placeholder="username" aria-label="username"></Field>
                </div>
                <div className="form-group">
                    <Field onChange={e => handleInputChange(e)} value={inputs.password} name="password" type="password" placeholder="password" aria-label="password"></Field>
                </div>
                <Button type="submit">Go</Button>
            </form>  
        </ContentContainer>
    )
}

export default SignInForm;