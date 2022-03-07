import { coursesTypes } from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case coursesTypes.FETCH_ALL_COURSES:
			return action.payload;
		case coursesTypes.ADD_COURSE:
			return [...state, action.payload];
		case coursesTypes.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		case coursesTypes.UPDATE_COURSE:
			const courseIndex = state.findIndex(
				(course) => course.id === action.payload.id
			);
			const copiedCourses = [...state];

			copiedCourses.splice(courseIndex, 1, action.payload);

			return copiedCourses;
		default:
			return state;
	}
};
