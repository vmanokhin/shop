import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { createLogger  } = require('redux-logger');
    const logger = createLogger({
        collapsed: true,
        predicate: (_, action) => !(action.type.includes('@@redux-form/REGISTER_FIELD') || action.type.includes('@@redux-form/UNREGISTER_FIELD'))
    });

    middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);
const store = createStore(reducer, {}, compose(
    enhancer,
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
));

export default store;