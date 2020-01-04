import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import Button from './Button';
import Alert from './ValidationAlert';
import Heading from './Heading';
import UseForm from '../hooks/UseForm';
import UseValidator from '../hooks/UseValidator';
import API from '../utils/API';
import validate from '../utils/validate';

const SignUpForm = () => {
   const {
        validInputs,
        invalidateInputs,
        duplicateEmail,
        duplicateEmailFound,
   } = UseValidator();

   const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
     const { username, password, confirmPassword } = inputs;
     const body = {
        Email: username,
        Password: password,
     }

     if (
        validate.email(body.Email) &&
        validate.password(body.Password) &&
        validate.match(body.Password, confirmPassword)
     ) {
        API
        .signUpUser(body)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err)
            duplicateEmailFound()
        });
     } else invalidateInputs()
   }, 'auth');

    return (
        <div>
            <Heading id={0} navType="loggedOut" />
            <ContentContainer color="white">
                {/* Valid inputs alert */}
                {validInputs ? null : <Alert>Some of your information doesn't meet the requirements. Please check that you have submitted a valid email and password and that your passwords match.</Alert>}
                {/* Dup email alert */}
                {duplicateEmail ? <Alert>The email address you're using already exists. Please try logging in instead.</Alert> : null}
                {/* Start of form */}
                <h4 className="title text-center">sign up</h4>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.username} name="username" type="text" placeholder="email address" aria-label="username" />
                    </div>
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.password} name="password" type="password" placeholder="password" aria-label="password" />
                        
                        {/* requirements toggler */}
                        <button style={{ padding: 0 }} className="navbar-toggler password-requirements-toggler" type="button" data-toggle="collapse" data-target="#passwordRequirements" aria-controls="passwordRequirements" aria-expanded="false" aria-label="Toggle password requirements">
                            <span className="pw-validation">password requirements</span>
                        </button>
                        {/* password requirements */}
                        <ul className="collapse" id="passwordRequirements" style={{ fontSize: '.8rem' }}>
                            <li>At least 12 characters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one lowercase letter</li>
                            <li>At least one number 0-9</li>
                            <li>At least one of the following special characters: ! @ # $ % ^ & *</li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.confirmPassword} name="confirmPassword" type="password" placeholder="re-enter password" aria-label="confirmPassword" />
                        {/* display message if passwords match */}
                        {validate.match(inputs.password, inputs.confirmPassword) ? <p className="pw-validation" style={{ color: '#DC143C' }}>passwords match!</p> : null}
                    </div>
                    <Button type="submit">Go</Button>  
                    <p className="small-text">
                        Have an account? <br />
                        <Link to="/login">Sign In</Link>                  
                    </p>
                </form>  
            </ContentContainer>
        </div>
    )
}

export default SignUpForm;