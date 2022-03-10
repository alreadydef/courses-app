import { coursesReducer } from '../courses/reducer';

import { mockedCourse, mockedCoursesList } from '../../constants';

import {
	addCourseAction,
	getAllCoursesAction,
} from '../courses/actionCreators';

describe('coursesReducer', () => {
	test('should return the initial state', () => {
		expect(coursesReducer(mockedCoursesList, {})).toEqual(mockedCoursesList);
	});

	test('should handle ADD_COURSE and returns new state', () => {
		expect(coursesReducer([], addCourseAction(mockedCourse))).toEqual([
			mockedCourse,
		]);
	});

	test('should handle FETCH_ALL_COURSES and returns new state', () => {
		expect(coursesReducer([], getAllCoursesAction(mockedCoursesList))).toEqual(
			mockedCoursesList
		);
	});
});
