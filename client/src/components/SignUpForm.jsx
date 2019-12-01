import React from "react";
import { Link, Redirect } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import Button from './Button';
import UseForm from '../hooks/UseForm';
import UseRedirect from '../hooks/UseRedirect';
import API from '../utils/API';

const SignUpForm = () => {
   const { redirect, redirectPage } = UseRedirect();
   const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
     const { username, password } = inputs;
     const body = {
        Email: username,
        Password: password,
     }
     API
       .signUpUser(body)
       .then(res => {
           if (res.status === 201) {
              redirectPage()
           }
       })
       .catch(err => console.log(err));
   }, 'auth');

    return (
        <ContentContainer color="white">
            { redirect ? <Redirect to="/login" /> : null }
            <h4 className="title text-center">sign up</h4>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.username} name="username" type="text" placeholder="username" aria-label="username" />
                </div>
                <div className="form-group">
                    <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.password} name="password" type="password" placeholder="password" aria-label="password" />
                </div>
                <div className="form-group">
                    <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.confirmPassword} name="confirmPassword" type="password" placeholder="re-enter password" aria-label="confirmPassword" />
                </div>
                <Button type="submit">Go</Button>  
                <p className="small-text">
                    Have an account? <br />
                    <Link to="/login">Sign In</Link>                  
                </p>
            </form>  
        </ContentContainer>
    )
}

export default SignUpForm;