import React from "react";
import ContentContainer from "./ContentContainer";
import Button from './Button';
import styled from "styled-components";

const Field = styled.input`
    border: 1px solid #778899;
    padding: 5px;
    width: 100%;
    :focus {
        background-color: #DBEFFF;
    }
`

const Title = styled.h4`
    margin: 15px 0;
`

const SmallText = styled.p`
    font-size: 12px;
`

const SignUpForm = () => {
    return (
        <ContentContainer color="white">
            <Title className="text-center">sign up</Title>
            <form>
                <div className="form-group">
                    <Field name="username" type="text" placeholder="username" aria-label="username"></Field>
                </div>
                <div className="form-group">
                    <Field name="password" type="password" placeholder="password" aria-label="password"></Field>
                </div>
                <div className="form-group">
                    <Field name="confirm-password" type="password" placeholder="re-enter password" aria-label="confirm-password"></Field>
                </div>
                <Button>Go</Button>  
                <SmallText>
                    Have an account? <br />
                    <a href="https://github.com/">Sign In</a>                    
                </SmallText>
            </form>  
        </ContentContainer>
    )
}

export default SignUpForm;