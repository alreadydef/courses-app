import { getCurrentRole, loginUser, logoutUser } from '../../services';

import { LOCALSTORAGE_KEYS } from '../../constants';

import {
	getUserRoleAction,
	loginUserAction,
	loginUserErrorAction,
	logoutUserAction,
} from './actionCreators';

export const sendRoleRequestAction = (token) => async (dispatch) => {
	const response = await getCurrentRole(token);
	const result = await response.json();

	if (response.ok) {
		const {
			result: { role },
		} = result;

		dispatch(getUserRoleAction(role));
	}
};

export const sendLoginRequestAction = (credentials) => async (dispatch) => {
	const response = await loginUser(credentials);
	const result = await response.json();

	if (response.ok) {
		const {
			result: token,
			user,
			user: { name, email },
		} = result;

		localStorage.setItem(LOCALSTORAGE_KEYS.USER_TOKEN, JSON.stringify(token));
		localStorage.setItem(LOCALSTORAGE_KEYS.USER_INFO, JSON.stringify(user));

		dispatch(loginUserAction({ token, name, email }));
		dispatch(sendRoleRequestAction(token));
	} else {
		dispatch(loginUserErrorAction(result.result));
	}
};

export const sendLogoutRequestAction = () => (dispatch, getState) => {
	const {
		user: { token },
	} = getState();

	logoutUser(token).then((response) => {
		dispatch(logoutUserAction());
	});
};
