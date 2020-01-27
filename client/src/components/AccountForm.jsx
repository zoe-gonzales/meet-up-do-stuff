import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import LargerButton from './RSVPButton';
import Alert from '../components/ValidationAlert';
import Heading from './Heading';
import UseForm from '../hooks/UseUpdateAccountForm';
import UseValidator from '../hooks/UseValidator';
import API from '../utils/API';

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
    } = UseForm(() => {
        const { newEmail, oldPassword, newPassword } = inputs;
        const updated = {
            newEmail,
            oldPassword,
            newPassword,
        }
        
        API
          .updateUser(userID, updated)
          .then(res => {
              if (res.status === 200) {
                alert("Your details have been updated.")
                clearFormFields()
              }
          })
          .catch(err => {
              if (err.response.status === 304) {
                  alert("Unable to make the requested changes. Please try again.")
              }
          })
    })
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <ContentContainer color="white">
                {validInputs ? null : <Alert>Passwords don't match.</Alert>}
                
                {/* update email form */}
                <h4 className="title text-center">change email</h4>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.newEmail} name="newEmail" type="text" placeholder="new email" aria-label="new email" />
                    </div>
                    <Button type="submit">update email</Button>
                </form>
                
                {/* update password form */}
                <h4 className="title text-center">change password</h4>
                <form onSubmit={e => handleSubmit(e)}>
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