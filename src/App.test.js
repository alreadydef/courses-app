import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES_PATH } from './constants';

test('renders Add new course button', () => {
	render(
		<MemoryRouter initialEntries={[ROUTES_PATH.COURSES]}>
			<App />
		</MemoryRouter>
	);
	const buttonElement = screen.getByText(/Add new course/i);
	expect(buttonElement).toBeInTheDocument();
});
