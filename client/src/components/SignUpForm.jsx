import React from "react";
import ContentContainer from "./ContentContainer";
import Button from './Button';
import UseForm from '../hooks/UseForm';

const SignUpForm = () => {
   const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
     console.log("callback called")
   }, 'auth');
    return (
        <ContentContainer color="white">
            <h4 className="title text-center">sign up</h4>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input className="auth-field" onChange={e => handleInputChange(e)} value={inputs.username} name="username" type="text" placeholder="username" aria-label="username" />
                </div>
                <div className="form-group">
                    <input className="auth-field" onChange={e => handleInputChange(e)} value={inputs.password} name="password" type="password" placeholder="password" aria-label="password" />
                </div>
                <div className="form-group">
                    <input className="auth-field" onChange={e => handleInputChange(e)} value={inputs.confirmPassword} name="confirmPassword" type="password" placeholder="re-enter password" aria-label="confirmPassword" />
                </div>
                <Button type="submit">Go</Button>  
                <p className="small-text">
                    Have an account? <br />
                    <a href="https://github.com/">Sign In</a>                    
                </p>
            </form>  
        </ContentContainer>
    )
}

export default SignUpForm;