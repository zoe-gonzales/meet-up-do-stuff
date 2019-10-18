import { useState } from React;

const UseForm = (fields, clearedFields, cb) => {
    const [inputs, setInputs] = useState(fields);

    const handleInputChange = e => {
        e.persist();
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleSubmit = e => {
        if (e) e.preventDefault();
        cb();
        setInputs(clearedFields);
    }

    return {
        inputs,
        handleInputChange,
        handleSubmit,
    }
};

export default UseForm;
