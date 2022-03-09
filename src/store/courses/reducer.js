import { coursesTypes } from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (
	state = coursesInitialState,
	{ type, payload }
) => {
	switch (type) {
		case coursesTypes.FETCH_ALL_COURSES:
			return payload;
		case coursesTypes.ADD_COURSE:
			return [...state, payload];
		case coursesTypes.DELETE_COURSE:
			return state.filter((course) => course.id !== payload);
		case coursesTypes.UPDATE_COURSE:
			const courseIndex = state.findIndex((course) => course.id === payload.id);
			const copiedCourses = [...state];

			copiedCourses.splice(courseIndex, 1, payload);

			return copiedCourses;
		default:
			return state;
	}
};
