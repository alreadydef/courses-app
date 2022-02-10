import { useState } from 'react';
import { LOCALSTORAGE_KEYS, ROUTES_PATH } from '../constants';
import { useHistory } from 'react-router-dom';

export const useLoggedInStatus = () => {
	const token = localStorage.getItem(LOCALSTORAGE_KEYS.USER_TOKEN);

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(token));

	const history = useHistory();

	const handleLogout = () => {
		localStorage.removeItem(LOCALSTORAGE_KEYS.USER_TOKEN);
		setIsUserLoggedIn(false);
		history.push(ROUTES_PATH.LOGIN);
	};

	return [isUserLoggedIn, handleLogout, setIsUserLoggedIn];
};
