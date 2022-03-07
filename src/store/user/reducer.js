import { userTypes } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	error: '',
	role: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case userTypes.LOGOUT_USER:
			return { ...userInitialState };
		case userTypes.LOGIN_USER:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				error: '',
			};
		case userTypes.LOGIN_USER_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case userTypes.LOGIN_USER_ROLE:
			return {
				...state,
				role: action.payload,
			};
		default:
			return state;
	}
};
