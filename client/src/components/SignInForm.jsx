import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import UseForm from '../hooks/UseForm';
import API from '../utils/API';

const SignInForm = () => {
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
                console.log("Log in was successful");
              }
          })
          .catch(err => console.log(err));
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