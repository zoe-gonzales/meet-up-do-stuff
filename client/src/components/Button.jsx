import React from "react";
import styled from "styled-components";

const Btn = styled.button`
    font-size: 12px;
    padding: 4.5px 9px;
    :hover {
        background-color: #DBEFFF;
        color: black;
    }
`

const Button = ({ children }) => {
    return <Btn className="btn btn-outline-dark border border-secondary rounded-0 float-right">{children}</Btn>
}

export default Button;