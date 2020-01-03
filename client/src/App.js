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
import EventAsPublic from './pages/EventAsPublic';
import EventAsUser from './pages/EventAsUser';
import AddEvent from './components/AddEvent';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

const App = () => {
  console.log(document.cookie)
  return (
    <Router>
      {/* navType="loggedOut" */}
      <Heading id={2} navType="loggedIn" />
      <Switch>
        <Route exact path="/" render={Home} />
        <Route exact path="/home/:id" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/createprofile/:id" component={CreateProfile} /> 
        <Route exact path="/createinterests/:id" component={InterestAdder} />
        <Route exact path="/profile/:id" component={UserProfile} />
        <Route exact path="/events/:id" component={EventAsPublic} />
        <Route exact path="/user/:userID/events/:eventID" component={EventAsUser} />
        <Route exact path="/user/:userID/addevent" component={AddEvent} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
