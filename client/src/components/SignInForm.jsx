import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import UseForm from '../hooks/UseForm';

const SignInForm = () => {
    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        console.log("sign in form submitted")
    }, 'auth');
    return (
        <ContentContainer color="white">
            <h4 className="title text-center">sign in</h4>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.username} name="username" type="text" placeholder="username" aria-label="username" />
                </div>
                <div className="form-group">
                    <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.password} name="password" type="password" placeholder="password" aria-label="password" />
                </div>
                <Button type="submit">Go</Button>
            </form>  
        </ContentContainer>
    )
}

export default SignInForm;