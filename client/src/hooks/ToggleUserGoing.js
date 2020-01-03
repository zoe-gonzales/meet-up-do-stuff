import { useState } from 'react';

const ToggleUserGoing = (RSVP, cb) => {
    const [userGoing, setUserGoing] = useState(false);

    const handleRSVP = e => {
        setUserGoing(RSVP)
        cb(e)
    }

    return {
        userGoing,
        handleRSVP,
    }
}

export default ToggleUserGoing;