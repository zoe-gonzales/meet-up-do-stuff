import { useState, useEffect } from 'react';

const UseProfileUpdateForm = (original, cb) => {
    const [inputs, setInputs] = useState({
        DisplayName: '',
        Location: '',
        Interests: [],
    });

    useEffect(() => {
        const profile = {...original}   
        const { DisplayName, Location, Interests } = profile;
        let modifiedInterests = []
        if (Interests && Interests !== '---') {
            modifiedInterests = Interests.split(',')
        }
        setInputs({
            DisplayName,
            Location,
            Interests: modifiedInterests,
        })
      }, [original]);

    const handleInputChange = e => {
        e.persist();
        const { name, value } = e.target;
        const changedInputs = {...inputs, [name]: value};
        setInputs(changedInputs);
    }

    const handleCheckboxSelection = (e, interests) => {
        e.persist();
        const { DisplayName, Location } = inputs;
        const { value } = e.target;
        let changedInterests = [...inputs.Interests]
        
        if (interests.includes(value)) {
            const updatedInterests = interests.filter(interest => interest !== value);
            changedInterests = updatedInterests;
        } else {
            changedInterests.push(value);
        }
        
        setInputs({
            DisplayName,
            Location,
            Interests: changedInterests,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        cb();
    }

    return {
        inputs,
        handleInputChange,
        handleCheckboxSelection,
        handleSubmit,
    }
};

export default UseProfileUpdateForm;