import { addAuthor, getAllAuthors } from '../../services';

import { addAuthorAction, getAllAuthorsAction } from './actionCreators';

export const fetchAllAuthorsAction = (dispatch) => {
	getAllAuthors()
		.then((response) => response.json())
		.then((data) => dispatch(getAllAuthorsAction(data.result)));
};

export const createAuthorAction =
	(authorName) => async (dispatch, getState) => {
		const {
			user: { token },
		} = getState();
		const response = await addAuthor(authorName, token);
		const result = await response.json();

		if (response.ok) {
			dispatch(addAuthorAction(result.result));
		}
	};
