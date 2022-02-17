import React from 'react';

import { Logo } from './components';

import { Button } from '../../common';

import {
	LOCALSTORAGE_KEYS,
	ROUTES_PATH,
	TEXT_CONSTANTS,
} from '../../constants';

import classes from './Header.module.css';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { logoutUserAction } from '../../store/user/actionCreators';

import { getUserAuthStatus, getUserName } from '../../selectors';

const Header = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const isUserLoggedIn = useSelector(getUserAuthStatus);
	const userName = useSelector(getUserName);

	const handleLogout = () => {
		localStorage.removeItem(LOCALSTORAGE_KEYS.USER_INFO);
		localStorage.removeItem(LOCALSTORAGE_KEYS.USER_TOKEN);
		dispatch(logoutUserAction());
		history.replace(ROUTES_PATH.LOGIN);
	};

	return (
		<header className={classes.header}>
			<nav className={classes.header__nav}>
				<ul className={classes.header__list}>
					<li className={classes.header__logo}>
						<Link className={classes.header__link} to={ROUTES_PATH.HOME}>
							<Logo />
						</Link>
					</li>
					{isUserLoggedIn && <li>{userName}</li>}
					{isUserLoggedIn && (
						<li>
							<Button
								className={classes['header__logout-btn']}
								text={TEXT_CONSTANTS.LOGOUT_BTN_TEXT}
								onClick={handleLogout}
							/>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
