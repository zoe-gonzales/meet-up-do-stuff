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
        <Route exact path="/" component={Home} />
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
