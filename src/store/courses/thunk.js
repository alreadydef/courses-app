import {
	addCourse,
	deleteCourse,
	getAllCourses,
	updateCourse,
} from '../../services';

import {
	addCourseAction,
	deleteCourseAction,
	getAllCoursesAction,
	updateCourseAction,
} from './actionCreators';

export const fetchAllCourses = (dispatch) => {
	getAllCourses()
		.then((response) => response.json())
		.then((data) => dispatch(getAllCoursesAction(data.result)));
};

export const createCourseAction = (course) => async (dispatch, getState) => {
	const {
		user: { token },
	} = getState();

	const response = await addCourse(course, token);
	const result = await response.json();

	if (response.ok) {
		dispatch(addCourseAction(result.result));
	}
};

export const removeCourseAction = (courseId) => async (dispatch, getState) => {
	const {
		user: { token },
	} = getState();

	const response = await deleteCourse(courseId, token);

	if (response.ok) {
		dispatch(deleteCourseAction(courseId));
	}
};

export const sendUpdateCourseAction =
	(course, id) => async (dispatch, getState) => {
		const {
			user: { token },
		} = getState();

		const response = await updateCourse(course, id, token);
		const result = await response.json();

		if (response.ok) {
			dispatch(updateCourseAction(result.result));
		}
	};
