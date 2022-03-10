import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import {
	mockedState,
	mockedStore,
	ROUTES_PATH,
	TEXT_CONSTANTS,
} from '../../../constants';

import { Provider } from 'react-redux';

import CourseForm from '../CourseForm';

describe('CourseForm', () => {
	afterEach(cleanup);

	beforeEach(() => {
		render(
			<MemoryRouter initialEntries={[ROUTES_PATH.ADD_COURSE]}>
				<Provider store={mockedStore}>
					<CourseForm />
				</Provider>
			</MemoryRouter>
		);
	});

	test('should show authors lists', () => {
		const authorTitleElement = screen.getByText(
			TEXT_CONSTANTS.AUTHORS_TITLE_TEXT
		);
		const authorListElement =
			authorTitleElement.parentElement.querySelector('.author-list');

		expect(authorListElement.children.length).toBe(mockedState.authors.length);
	});

	test('should call dispatch after clicking on add author button', () => {
		const addCourseBtnElement = screen.getByText(
			TEXT_CONSTANTS.CREATE_AUTHOR_BTN_TEXT
		);
		const authorInputElement = screen.getByPlaceholderText(
			TEXT_CONSTANTS.AUTHOR_NAME_PLACEHOLDER_TEXT
		);

		fireEvent.change(authorInputElement, { target: { value: 'test author' } });
		fireEvent(
			addCourseBtnElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(mockedStore.dispatch).toHaveBeenCalled();
	});

	test('should add an author to course authors list after clicking add author button', () => {
		const authorItemElement = screen.getByText(mockedState.authors[0].name);
		const addAuthorBtnElement = authorItemElement.querySelector('button');
		const authorTitleElement = screen.getByText(
			TEXT_CONSTANTS.COURSE_AUTHORS_TITLE
		);
		let authorListElement;

		fireEvent(
			addAuthorBtnElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		authorListElement =
			authorTitleElement.parentElement.querySelector('.author-list');

		expect(authorListElement.children.length).toEqual(1);
	});

	test('should delete an author from the course list after clicking on remove button', () => {
		const authorItemElement = screen.getByText(mockedState.authors[0].name);
		const addAuthorBtnElement = authorItemElement.querySelector('button');

		fireEvent(
			addAuthorBtnElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const courseAuthorItemElement = screen.getByText(
			mockedState.authors[0].name
		);
		const deleteAuthorBtnElement =
			courseAuthorItemElement.querySelector('button');

		fireEvent(
			deleteAuthorBtnElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);
		const emptyMsgElement = screen.getByText(
			TEXT_CONSTANTS.EMPTY_AUTHORS_LIST_MSG
		);

		expect(emptyMsgElement).toBeInTheDocument();
	});
});
