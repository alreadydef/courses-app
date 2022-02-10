import React from 'react';

import { Logo } from './components';

import { Button } from '../../common';

import {
	LOCALSTORAGE_KEYS,
	ROUTES_PATH,
	TEXT_CONSTANTS,
} from '../../constants';

import classes from './Header.module.css';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Header = ({ isUserLoggedIn, handleLogout }) => {
	const userInfo = JSON.parse(
		localStorage.getItem(LOCALSTORAGE_KEYS.USER_INFO)
	);

	return (
		<header className={classes.header}>
			<nav className={classes.header__nav}>
				<ul className={classes.header__list}>
					<li className={classes.header__logo}>
						<Link className={classes.header__link} to={ROUTES_PATH.HOME}>
							<Logo />
						</Link>
					</li>
					{isUserLoggedIn && <li>{userInfo.name}</li>}
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

Header.propTypes = {
	isUserLoggedIn: PropTypes.bool.isRequired,
	handleLogout: PropTypes.func.isRequired,
};

export default Header;
