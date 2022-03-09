import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { userReducer } from './user/reducer';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';

export const store = createStore(
	combineReducers({
		user: userReducer,
		courses: coursesReducer,
		authors: authorsReducer,
	}),
	composeWithDevTools(applyMiddleware(thunk))
);
