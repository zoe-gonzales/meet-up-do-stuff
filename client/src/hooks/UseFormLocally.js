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
        let changedInterests = [...inputs.relatedInterests]
        
        if (interests.includes(value)) {
            const updatedInterests = interests.filter(interest => interest !== value);
            changedInterests = updatedInterests;
        } else {
            changedInterests.push(value);
        }
        
        setInputs({
            title,
            desc,
            date,
            time,
            location,
            relatedInterests: changedInterests,
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

export default UseFormLocally;