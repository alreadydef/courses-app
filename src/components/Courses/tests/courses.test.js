import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MemoryRouter, Router } from 'react-router-dom';

import {
	mockedState,
	mockedStore,
	mockedStoreWithEmptyCourses,
	ROUTES_PATH,
	TEXT_CONSTANTS,
} from '../../../constants';

import { createMemoryHistory } from 'history';

import Courses from '../Courses';

describe('courses', () => {
	afterEach(cleanup);

	test('should display amount of CourseCard equal length of courses array', () => {
		const coursesLength = mockedState.courses.length;
		const { container } = render(
			<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
				<Provider store={mockedStore}>
					<Courses />
				</Provider>
			</MemoryRouter>
		);
		const coursesListElement = container.querySelector('.courses-list');

		expect(coursesListElement.children.length).toEqual(coursesLength);
	});

	test('should display Empty container if courses array length is 0', () => {
		const { container } = render(
			<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
				<Provider store={mockedStoreWithEmptyCourses}>
					<Courses />
				</Provider>
			</MemoryRouter>
		);
		const coursesListElement = container.querySelector('.courses-list');

		expect(coursesListElement.children.length).toEqual(0);
	});

	test('should show CourseForm after a click on a button "Add new course"', () => {
		const history = createMemoryHistory();

		render(
			<Router history={history}>
				<Provider store={mockedStore}>
					<Courses />
				</Provider>
			</Router>
		);

		fireEvent(
			screen.getByText(TEXT_CONSTANTS.ADD_NEW_COURSE_BTN_TEXT),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(history.location.pathname).toBe(ROUTES_PATH.ADD_COURSE);
	});
});
