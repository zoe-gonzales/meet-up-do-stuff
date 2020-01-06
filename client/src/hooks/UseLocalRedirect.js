import { useState } from 'react';

const UseLocalRedirect = () => {
    const [redirect, setRedirect] = useState(false);
    const redirectPage = () => setRedirect(true);

    return {
        redirect,
        redirectPage,
    }
}

export default UseLocalRedirect;