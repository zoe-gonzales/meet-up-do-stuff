import React from 'react';
import Form from '../components/AccountForm';

const UserAccount = props => {
    return <Form userID={props.match.params.userID} />
}

export default UserAccount;
