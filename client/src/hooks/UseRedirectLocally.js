import { useState } from 'react';

const UseRedirectLocally = () => {
    const [redirect, setRedirect] = useState(false);
    const redirectPage = () => setRedirect(true);

    return {
        redirect,
        redirectPage,
    }
}

export default UseRedirectLocally;