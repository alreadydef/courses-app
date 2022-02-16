import { authorsTypes } from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case authorsTypes.SET_ALL_AUTHORS:
			return action.payload;
		case authorsTypes.ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};
