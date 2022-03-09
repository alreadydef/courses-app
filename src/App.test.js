import * as redux from 'react-redux';

import { render, screen } from '@testing-library/react';

import App from './App';

import { MemoryRouter } from 'react-router-dom';

import { ROUTES_PATH } from './constants';

import { Provider } from 'react-redux';

import { store } from './store';

test('renders Add new course button', () => {
	const reduxSpy = jest.spyOn(redux, 'useSelector');

	reduxSpy.mockReturnValue([]);

	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
				<App />
			</MemoryRouter>
		</Provider>
	);
	const buttonElement = screen.getByText(/Logout/i);

	expect(buttonElement).toBeInTheDocument();
});
