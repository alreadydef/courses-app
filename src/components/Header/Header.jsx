import React from 'react';

import { Logo } from './components';
import { Button } from '../../common';

import { TEXT_CONSTANTS } from '../../constants';

import classes from './Header.module.css';

const Header = () => {
	return (
		<header className={classes.header}>
			<nav className={classes.header__nav}>
				<ul className={classes.header__list}>
					<li className={classes.header__logo}>
						<a className={classes.header__link} href='/'>
							<Logo />
						</a>
					</li>
					<li>
						<a className={classes.header__link} href='/'>
							{TEXT_CONSTANTS.ACCOUNT_TEXT}
						</a>
					</li>
					<li>
						<Button
							className={classes['header__logout-btn']}
							text={TEXT_CONSTANTS.LOGOUT_BTN_TEXT}
						/>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
