import { authorsTypes } from './actionTypes';

export const doGetAllAuthors = (authors) => ({
	type: authorsTypes.SET_ALL_AUTHORS,
	payload: authors,
});

export const doAddAuthor = (author) => ({
	type: authorsTypes.ADD_AUTHOR,
	payload: author,
});
