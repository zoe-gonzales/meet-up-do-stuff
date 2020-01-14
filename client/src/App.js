import React from 'react';
import {
  BrowserRouter as 
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import HomeAsUser from './pages/HomeAsUser';
import LogIn from './components/SignInForm';
import SignUp from './components/SignUpForm';
import CreateProfile from './components/ProfileForm';
import InterestAdder from './pages/AddInterests';
import EventAsPublic from './pages/EventAsPublic';
import EventAsUser from './pages/EventAsUser';
import UsersRSVPS from './pages/UsersRSVPS';
import AddEvent from './components/AddEvent';
import AlterEvents from './pages/AlterEvents';
import UpdateEvent from './components/UpdateEventForm';
import UserProfile from './pages/UserProfile';
import ProfileAsUser from './pages/ProfileAsUser';
import LoggedOut from './components/LoggedOut';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home/:id" component={HomeAsUser} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/createprofile/:id" component={CreateProfile} /> 
        <Route exact path="/createinterests/:id" component={InterestAdder} />
        <Route exact path="/profile/:id" component={UserProfile} />
        <Route exact path="/user/:userID/profile" component={ProfileAsUser} />
        <Route exact path="/events/:id" component={EventAsPublic} />
        <Route exact path="/user/:userID/events/:eventID" component={EventAsUser} />
        <Route exact path="/user/:userID/events" component={UsersRSVPS} />
        <Route exact path="/user/:userID/addevent" component={AddEvent} />
        <Route exact path="/user/:userID/alterevents" component={AlterEvents} />
        <Route exact path="/user/:userID/updateevent/:eventID" component={UpdateEvent} />
        <Route exact path="/loggedout" component={LoggedOut} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
