import React from 'react';
import {
  BrowserRouter as 
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" 
          render={() => <Home events={events} />}
        />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  )
}

export default App;
