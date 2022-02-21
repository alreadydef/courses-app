import { coursesTypes } from './actionTypes';

export const getAllCoursesAction = (courses) => ({
	type: coursesTypes.FETCH_ALL_COURSES,
	payload: courses,
});

export const addCourseAction = (course) => ({
	type: coursesTypes.ADD_COURSE,
	payload: course,
});

export const deleteCourseAction = (courseId) => ({
	type: coursesTypes.DELETE_COURSE,
	payload: courseId,
});
