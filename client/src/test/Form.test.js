import React from 'react';
import { render, /*fireEvent*/ wait } from '@testing-library/react';
import { Provider } from'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import UpdateEvent from '../components/UpdateEventForm';
import RootReducer from '../reducers/RootReducer';
import { MemoryRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    RootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk))
);

test('it listens for changes to form inputs', async () => {
    await wait(
        () => {
        const container = render(
            <Provider store={store}>
                <MemoryRouter initialIndex={['/user/2/updateevent/2']}>
                    <UpdateEvent/>
                </MemoryRouter>
            </Provider>
        )
        const input = container.findAllByAltText('input')
    })
})
