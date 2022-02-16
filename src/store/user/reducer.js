import { userTypes } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case userTypes.LOGOUT_USER:
			return { ...userInitialState };
		case userTypes.LOGIN_USER:
			return {
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		default:
			return state;
	}
};
