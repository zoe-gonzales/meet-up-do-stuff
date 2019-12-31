import React from "react";

const handleClick = e => {
    const userID = e.target.id
    console.log(userID)
}

const Button = ({ children, color, id }) => {
    return <button onClick={e => handleClick(e)} type="button" className="oval-btn btn btn-info" style={{ backgroundColor: color }} id={id ? id : 0}>{children}</button>
}

export default Button;