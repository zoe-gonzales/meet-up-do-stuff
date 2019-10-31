import React from "react";
import styled from "styled-components";

const Btn = styled.button`
    border-radius: 20px;
    width: 90%;
    height: 30px;
    padding: 0;
    :hover {
        transform: scale(1.02);
    }
`

const Button = ({ children, color }) => {
    return <Btn type="button" className="btn btn-info" style={{ backgroundColor: color, border: '1px solid ' + color }}>{children}</Btn>
}

export default Button;