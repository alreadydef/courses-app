import { HOST, URLs } from './constants';

export const getAllCourses = () =>
	fetch(`${HOST}/${URLs.ALL_COURSES}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const getAllAuthors = () =>
	fetch(`${HOST}/${URLs.ALL_AUTHORS}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const loginUser = (credentials) =>
	fetch(`${HOST}/${URLs.LOGIN}`, {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const registerUser = (credentials) =>
	fetch(`${HOST}/${URLs.REGISTER}`, {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	});
