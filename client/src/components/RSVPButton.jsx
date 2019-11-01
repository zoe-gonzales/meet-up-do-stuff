import React from "react";

const Button = ({ children, color }) => {
    return <Btn type="button" className="oval-btn btn btn-info" style={{ backgroundColor: color, border: '1px solid ' + color }}>{children}</Btn>
}

export default Button;