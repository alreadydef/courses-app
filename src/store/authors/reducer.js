import { authorsTypes } from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (
	state = authorsInitialState,
	{ type, payload }
) => {
	switch (type) {
		case authorsTypes.FETCH_ALL_AUTHORS:
			return payload;
		case authorsTypes.ADD_AUTHOR:
			return [...state, payload];
		default:
			return state;
	}
};
