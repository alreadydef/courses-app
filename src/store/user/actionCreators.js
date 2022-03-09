import { userTypes } from './actionTypes';

export const loginUserAction = (credentials) => ({
	type: userTypes.LOGIN_USER,
	payload: credentials,
});

export const logoutUserAction = () => ({ type: userTypes.LOGOUT_USER });

export const loginUserErrorAction = (errorMsg) => ({
	type: userTypes.LOGIN_USER_ERROR,
	payload: errorMsg,
});

export const getUserRoleAction = (role) => ({
	type: userTypes.LOGIN_USER_ROLE,
	payload: role,
});
