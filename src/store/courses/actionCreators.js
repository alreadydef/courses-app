import { coursesTypes } from './actionTypes';

export const doGetAllCourses = (courses) => ({
	type: coursesTypes.SET_ALL_COURSES,
	payload: courses,
});

export const doAddCourse = (course) => ({
	type: coursesTypes.ADD_COURSE,
	payload: course,
});

export const doDeleteCourse = (courseId) => ({
	type: coursesTypes.DELETE_COURSE,
	payload: courseId,
});
