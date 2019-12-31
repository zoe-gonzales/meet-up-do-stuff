import React from "react";

const Button = (
    {
        children,
        color,
        handleClick,
        event,
        user,
    }
) => {
    return <button 
                onClick={e => handleClick(e)}
                type="button"
                className="oval-btn btn btn-info"
                style={{ backgroundColor: color }}
                data-event={event}
                data-user={user}
            >{children}</button>
}

export default Button;