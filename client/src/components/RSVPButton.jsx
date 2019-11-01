import React from "react";

const Button = ({ children, color }) => {
    return <button type="button" className="oval-btn btn btn-info" style={{ backgroundColor: color, border: '1px solid ' + color }}>{children}</button>
}

export default Button;