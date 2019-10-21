import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './reducers/RootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    RootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);