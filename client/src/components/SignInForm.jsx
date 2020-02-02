import React from 'react';
import { Redirect } from 'react-router-dom';
import ContentContainer from './ContentContainer';
import Button from './Button';
import Alert from './ValidationAlert';
import Heading from './Heading';
import UseForm from '../hooks/UseForm';
import UseRedirect from '../hooks/UseRedirect';
import UseValidator from '../hooks/UseValidator';
import API from '../utils/API';
import validate from '../utils/validate';

const SignInForm = () => {
    const {
        id,
        redirect,
        redirectPage,
    } = UseRedirect();

    const {
        validInputs,
        invalidateInputs,
   } = UseValidator();

    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        const { username, password } = inputs;
        const body = {
           Email: username,
           Password: password,
        }

        if (
            validate.string(body.Email) &&
            validate.string(body.Password)
        ) {
            API
            .logInUser(body)
            .then(res => {
                if (res.status === 200) {
                    redirectPage(res.data.UserID)
                }
            })
            .catch(err => {
                console.log(err)
                invalidateInputs()
            });
        } else {
            invalidateInputs()
        }
        
    }, 'auth');

    return (
        <div>
            <Heading id={0} navType="loggedOut" />
            <div className="flex-container">
                <ContentContainer color="white">
                    { validInputs ? null : <Alert>Oh no! Something's not right with your credentials. Please try logging in again, or signing up.</Alert> }
                    { redirect ? <Redirect to={`/home/${id}`} /> : null }
                    <h4 className="title text-center">sign in</h4>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.username} name="username" type="text" placeholder="email" aria-label="email" />
                        </div>
                        <div className="form-group">
                            <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.password} name="password" type="password" placeholder="password" aria-label="password" />
                        </div>
                        <Button type="submit">Go</Button>
                    </form>  
                </ContentContainer>
            </div>
        </div>   
    )
}

export default SignInForm;