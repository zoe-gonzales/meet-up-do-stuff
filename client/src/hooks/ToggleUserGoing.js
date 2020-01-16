import { useState, useEffect } from 'react';

const ToggleUserGoing = (RSVP, cb) => {
    const [userGoing, setUserGoing] = useState(false);

    useEffect(() => {
        setUserGoing(RSVP)
    }, [RSVP])
    
    const handleRSVP = e => {
        setUserGoing(!RSVP)
        cb(e)
    }

    return {
        userGoing,
        handleRSVP,
    }
}

export default ToggleUserGoing;