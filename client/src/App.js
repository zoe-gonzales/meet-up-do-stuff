import React from 'react';
import {
  BrowserRouter as 
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import Heading from './components/Heading';
import Home from './pages/Home';
import LogIn from './components/SignInForm';
import SignUp from './components/SignUpForm';
import CreateProfile from './components/ProfileForm';
import InterestAdder from './pages/AddInterests';
import Event from './pages/Event';
import AddEvent from './components/AddEvent';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Heading />
      <Switch>
        <Route exact path="/" render={() => <Home type="loggedOut" />} />
        <Route exact path="/home/:id" render={() => <Home navType="loggedIn" />} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/createprofile/:id" component={CreateProfile} /> 
        <Route exact path="/createinterests/:id" component={InterestAdder} />
        <Route exact path="/profile/:id" component={UserProfile} />
        <Route exact path="/events/:id" component={Event} />
        <Route exact path="/addevent" component={AddEvent} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
