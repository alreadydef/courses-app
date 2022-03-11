import { cleanup, render, screen } from '@testing-library/react';

import CourseCard from '../CourseCard';

import {
	mockedAuthorsList,
	mockedCourse,
	mockedStore,
	ROUTES_PATH,
} from '../../../../../constants';

import { getAuthorNames, pipeDuration } from '../../../../../helpers';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

describe('CourseCard', () => {
	const duration = pipeDuration(mockedCourse.duration);
	const authors = getAuthorNames(mockedCourse, mockedAuthorsList);
	const mockedCourseCard = (
		<CourseCard
			onDeleteCourse={jest.fn()}
			title={mockedCourse.title}
			duration={duration}
			onEditCourse={jest.fn()}
			onShowCourse={jest.fn()}
			authors={authors}
			isAdminRole={true}
			creationTime={mockedCourse.creationDate}
			description={mockedCourse.description}
		/>
	);

	afterEach(cleanup);

	beforeEach(() => {
		render(
			<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
				<Provider store={mockedStore}>{mockedCourseCard}</Provider>
			</MemoryRouter>
		);
	});

	test('should display title', () => {
		const titleElement = screen.getByText(mockedCourse.title);

		expect(titleElement).toBeInTheDocument();
	});

	test('should display description', () => {
		const descriptionElement = screen.getByText(mockedCourse.description);

		expect(descriptionElement).toBeInTheDocument();
	});

	test('should display duration in correct format', () => {
		const durationElement = screen.getByText(duration);

		expect(durationElement).toBeInTheDocument();
	});

	test('should display author list', () => {
		const expectedAuthorList = authors.join(', ');
		const authorListElement = screen.getByText(expectedAuthorList);

		expect(authorListElement).toBeInTheDocument();
	});

	test('should display created date in the correct format', () => {
		const expectedCreationDate = mockedCourse.creationDate.split('/').join('.');
		const creationDateElement = screen.getByText(expectedCreationDate);

		expect(creationDateElement).toBeInTheDocument();
	});
});
