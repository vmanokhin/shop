import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './libs/history';
import App from './App';


function Root() {
    return (
        <Provider store={store} >
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
    );
}

export default Root;
