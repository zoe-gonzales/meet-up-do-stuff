import React from 'react';
import Heading from './components/Heading';
import NextBtn from './components/Button';
import RSVPButton from './components/RSVPButton';
import SignIn from './components/SignInForm';
import SignUp from './components/SignUpForm';

function App() {
  return (
    <div>
      <Heading />
      <NextBtn>Go</NextBtn>
      <RSVPButton>Going</RSVPButton>
      <SignIn />
      <SignUp />
    </div>
  )
}

export default App;
