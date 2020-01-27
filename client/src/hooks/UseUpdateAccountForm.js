import { useState } from 'react';

const UseUpdateAccountForm = cb => {
    const [inputs, setInputs] = useState({
        newEmail: '',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const handleInputChange = e => {
        e.persist();
        const { name, value } = e.target;
        const changedInputs = {...inputs, [name]: value};
        setInputs(changedInputs);
    }

    const handleSubmit = e => {
        e.preventDefault();
        cb();
    }

    const clearFormFields = () => {
        setInputs({
            newEmail: '',
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        });
    }

    return {
        inputs,
        handleInputChange,
        handleSubmit,
        clearFormFields,
    }
};

export default UseUpdateAccountForm;