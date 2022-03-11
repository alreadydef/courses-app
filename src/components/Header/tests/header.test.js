import { cleanup, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { mockedStore, ROUTES_PATH, TEXT_CONSTANTS } from '../../../constants';

import Header from '../Header';

describe('Header', () => {
	afterEach(cleanup);

	test('should have logo', () => {
		render(
			<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
				<Provider store={mockedStore}>
					<Header />
				</Provider>
			</MemoryRouter>
		);

		const logoImg = screen.getByAltText(TEXT_CONSTANTS.LOGO_ALT_TEXT);

		expect(logoImg).toBeInTheDocument();
	});

	test("should have user's name", () => {
		render(
			<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
				<Provider store={mockedStore}>
					<Header />
				</Provider>
			</MemoryRouter>
		);

		const userName = screen.getByText('Test Name');

		expect(userName).toBeInTheDocument();
	});
});
