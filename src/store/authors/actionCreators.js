import { authorsTypes } from './actionTypes';

export const getAllAuthorsAction = (authors) => ({
	type: authorsTypes.FETCH_ALL_AUTHORS,
	payload: authors,
});

export const addAuthorAction = (author) => ({
	type: authorsTypes.ADD_AUTHOR,
	payload: author,
});
