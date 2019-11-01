import React from "react";

const Button = ({ children }) => {
    return <button className="square-btn btn btn-outline-dark border border-secondary rounded-0 float-right">{children}</button>
}

export default Button;