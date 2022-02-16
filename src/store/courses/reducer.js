import { coursesTypes } from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case coursesTypes.SET_ALL_COURSES:
			return action.payload;
		case coursesTypes.ADD_COURSE:
			return [...state, action.payload];
		case coursesTypes.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
};
