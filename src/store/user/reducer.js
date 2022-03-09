import { userTypes } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	error: '',
	role: '',
};

export const userReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case userTypes.LOGOUT_USER:
			return { ...userInitialState };
		case userTypes.LOGIN_USER:
			return {
				...state,
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.token,
				error: '',
			};
		case userTypes.LOGIN_USER_ERROR:
			return {
				...state,
				error: payload,
			};
		case userTypes.LOGIN_USER_ROLE:
			return {
				...state,
				role: payload,
			};
		default:
			return state;
	}
};
