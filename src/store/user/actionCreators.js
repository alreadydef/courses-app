import { userTypes } from './actionTypes';

export const doLoginUser = (credentials) => ({
	type: userTypes.LOGIN_USER,
	payload: credentials,
});

export const doLogoutUser = () => ({ type: userTypes.LOGOUT_USER });
