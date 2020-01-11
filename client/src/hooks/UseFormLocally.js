import { useState, useEffect } from 'react';
import moment from 'moment';

const UseFormLocally = (original, cb) => {
    const [inputs, setInputs] = useState({
        title: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        relatedInterests: [],
    });

    useEffect(() => {
        const event = {...original}   
        const { Title, Desc, DateAndTime, Location, Interests } = event;
        setInputs({
            title: Title,
            desc: Desc,
            date: moment(DateAndTime).format('YYYY-MM-DD'),
            time: moment(DateAndTime).format('HH:mm'),
            location: Location,
            relatedInterests: Interests ? Interests.split(',') : undefined,
        });
      }, [original]);

    const handleInputChange = e => {
        e.persist();
        const { name, value } = e.target;
        const changedInputs = {...inputs, [name]: value};
        setInputs(changedInputs);
    }

    const handleCheckboxSelection = (e, interests) => {
        e.persist();
        const { title, desc, date, time, location } = inputs;
        const { value } = e.target;
        interests.push(value)
        setInputs({
            title,
            desc,
            date,
            time,
            location,
            relatedInterests: interests,
        })
    }

    const handleInterestSelected = (e, interests) => {
        e.persist();
        const { title, desc, date, time, location } = inputs;
        const { value } = e.target;
        const changedInputs = {...inputs}
        if (interests.includes(value)) {
            const updatedInterests = interests.filter(interest => interest !== value);
            changedInputs.interests = updatedInterests;
        } else {
            interests.push(value);
        }
        setInputs({
            title,
            desc,
            date,
            time,
            location,
            relatedInterests: interests,
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
        handleInterestSelected,
    }
};

export default UseFormLocally;