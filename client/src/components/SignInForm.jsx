import React from 'react';
import { Redirect } from 'react-router-dom';
import ContentContainer from './ContentContainer';
import Button from './Button';
import UseForm from '../hooks/UseForm';
import UseRedirect from '../hooks/UseRedirect';
import API from '../utils/API';

const SignInForm = () => {
    const { redirect, redirectPage } = UseRedirect();
    const { inputs, handleInputChange, handleSubmit } = UseForm(() => {
        const { username, password } = inputs;
        const body = {
           Email: username,
           Password: password,
        }
        API
          .logInUser(body)
          .then(res => {
              if (res.status === 200) {
                redirectPage()
              }
          })
          .catch(err => console.log(err));
    }, 'auth');

    return (
        <ContentContainer color="white">
            { redirect ? <Redirect to="/" /> : null }
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