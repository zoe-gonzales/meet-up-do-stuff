import React from 'react';
import ContentContainer from './ContentContainer';
import Button from './Button';
import LargerButton from './RSVPButton';
import Alert from '../components/ValidationAlert';
import Heading from './Heading';
import UseForm from '../hooks/UseUpdateAccountForm';
import UseValidator from '../hooks/UseValidator';
import API from '../utils/API';
import validate from '../utils/validate';

const AccountForm = ({ userID }) => {
    const {
        validInputs,
        invalidateInputs,
    } = UseValidator();

    const deleteUser = () => {
        const deleteAccount = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (deleteAccount) {
            API
              .deleteUser(userID)
              .then(res => console.log(res))
              .catch(err => console.log(err))
        }
    }

    const {
        inputs,
        handleInputChange,
        handleSubmit,
        clearFormFields,
    } = UseForm(() => {
        const { newEmail, oldPassword, newPassword, newPasswordConfirm } = inputs;
        const passwordUpdated = validate.password(newPassword) && validate.match(newPassword, newPasswordConfirm) &&  newPassword !== oldPassword
        if (validate.email(newEmail) || passwordUpdated) {
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
        } else invalidateInputs()
    })
    return (
        <div>
            <Heading id={userID} navType="loggedIn" />
            <ContentContainer color="white">
                {validInputs ? null : (
                    <Alert>
                        Double check each field. 
                        If changing your email, please ensure that it is in the correct format.
                        If changing your password, please ensure that it meets the requirements listed and does not match your previous password.
                    </Alert>
                )}
                
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
                    {/* new password confirm */}
                    <div className="form-group">
                        <input className="auth-field form-control border-secondary rounded-0" onChange={e => handleInputChange(e)} value={inputs.newPasswordConfirm} name="newPasswordConfirm" type="password" placeholder="confirm new password" aria-label="new password" />
                    {/* display message if passwords match */}
                    {validate.match(inputs.newPassword, inputs.newPasswordConfirm) ? <p className="pw-validation" style={{ color: '#DC143C' }}>passwords match!</p> : null}
                    </div>
                    <Button type="submit">update password</Button>
                </form>
                <br />
                <LargerButton color={'#DC143C'} handleClick={deleteUser}>Delete Account</LargerButton>
            </ContentContainer>
        </div>
    )
}

export default AccountForm;