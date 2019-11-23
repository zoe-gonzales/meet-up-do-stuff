import React from 'react';
import {
  BrowserRouter as 
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './components/SignInForm';
import SignUp from './components/SignUpForm';
import CreateProfile from './components/ProfileForm';
import InterestAdder from './pages/AddInterests';
import Event from './pages/Event';
import Heading from './components/Heading';

const events = [
  {
    id: 1,
    title: 'Event #1',
    description: 'First Event',
    path: '/events/1',
  },
  {
    id: 2,
    title: 'Event #2',
    description: 'Second Event',
    path: '/events/2',
  },
  {
    id: 3,
    title: 'Event #3',
    description: 'Third Event',
    path: '/events/3',
  },
  {
    id: 4,
    title: 'Event #4',
    description: 'Fourth Event',
    path: '/events/4',
  }
];

const fakeEvent = {
  title: "Coffee and coloring",
  date: "December 1, 2019",
  time: "5pm MT",
  location: "La Belle Rosette, 2423 S University Blvd, Denver 80210",
  description: "Come hang out, drink coffee, and color"
}

const App = () => {
  return (
    <Router>
      <Heading />
      <Switch>
        <Route exact path="/" render={() => <Home events2={events} />} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/createprofile/:id" component={CreateProfile} /> 
        <Route exact path="/createinterests/:id" component={InterestAdder} />
        <Route exact path="/events/:id" render={() => <Event event={fakeEvent} />} />
      </Switch>
    </Router>
  )
}

export default App;
