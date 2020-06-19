import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require('redux-logger');
	const logger = createLogger({
		collapsed: true
	});

	middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);
const store = createStore(reducer, {}, composeWithDevTools(
	enhancer
));

export default store;