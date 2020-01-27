import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import LargerButton from './RSVPButton';
import Alert from '../components/ValidationAlert';
import Heading from './Heading';
import UseForm from '../hooks/UseUpdateAccountForm';
import UseValidator from '../hooks/UseValidator';

const AccountForm = ({ userID }) => {
    const {
        validInputs,
        invalidateInputs,
    } = UseValidator();

    const deleteUser = () => {
        console.log(`account #${userID} deleted`)
    }

    const {
        inputs,
        handleInputChange,
        handleSubmit,
        clearFormFields,
    } = UseForm(type => {
        switch(type) {
            case 'email':
                console.log(inputs);
                console.log('email updated');
                break
            case 'password':
                console.log(inputs);
                console.log('password updated');
                break
            default:
                return null;
        }
    })
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <ContentContainer color="white">
                {validInputs ? null : <Alert>Passwords don't match.</Alert>}
                
                {/* update email form */}
                <h4 className="title text-center">change email</h4>
                <form onSubmit={e => handleSubmit(e, 'email')}>
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.newEmail} name="newEmail" type="text" placeholder="new email" aria-label="new email" />
                    </div>
                    <Button type="submit">update email</Button>
                </form>
                
                {/* update password form */}
                <h4 className="title text-center">change password</h4>
                <form onSubmit={e => handleSubmit(e, 'password')}>
                    {/* old password */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.oldPassword} name="oldPassword" type="password" placeholder="current password" aria-label="old password" />
                    </div>
                    {/* new password */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.newPassword} name="newPassword" type="password" placeholder="new password" aria-label="new password" />
                    </div>
                    {/* new password confirm */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.newPasswordConfirm} name="newPasswordConfirm" type="password" placeholder="confirm new password" aria-label="new password" />
                    </div>
                    <Button type="submit">update password</Button>
                </form>
                <br />
                <LargerButton handleClick={deleteUser}>Delete Account</LargerButton>
            </ContentContainer>
        </div>
    )
}

export default AccountForm;