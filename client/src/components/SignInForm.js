import React from "react";
import ContentContainer from "./ContentContainer";
import styled from "styled-components";

const Field = styled.input`
    border: 1px solid #778899;
    padding: 5px;
`

const SignInForm = () => {
    return (
        <ContentContainer color="white">
            <form>
                <div class="form-group">
                    <Field name="username" placeholder="username"></Field>
                </div>
                <div class="form-group">
                    <Field name="password" placeholder="password"></Field>
                </div>
            </form>  
        </ContentContainer>
    )
}

export default SignInForm;