import { userTypes } from './actionTypes';

export const loginUserAction = (credentials) => ({
	type: userTypes.LOGIN_USER,
	payload: credentials,
});

export const logoutUserAction = () => ({ type: userTypes.LOGOUT_USER });
