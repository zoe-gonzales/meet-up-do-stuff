import React from "react";
import styled from "styled-components";

const Border = styled.div`
    border: 1px solid #778899;
    padding: 20px;
    margin: 20px;
`

const ContentContainer = ({ children, color }) => {
    return <Border style={{ backgroundColor: color }} className="container">{ children }</Border>;
}

export default ContentContainer;