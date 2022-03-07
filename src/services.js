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

export const addAuthor = (authorName, token) =>
	fetch(`${HOST}/${URLs.ADD_AUTHOR}`, {
		method: 'POST',
		body: JSON.stringify({ name: authorName }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

export const addCourse = (course, token) =>
	fetch(`${HOST}/${URLs.ADD_COURSE}`, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

export const deleteCourse = (id, token) =>
	fetch(`${HOST}/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

export const updateCourse = (course, id, token) =>
	fetch(`${HOST}/courses/${id}`, {
		method: 'PUT',
		body: JSON.stringify(course),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});

export const getCurrentRole = (token) =>
	fetch(`${HOST}/${URLs.CURRENT_ROLE}`, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});

export const logoutUser = (token) =>
	fetch(`${HOST}/${URLs.LOGOUT}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
