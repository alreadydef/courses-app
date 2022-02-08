import React, { useRef, useState } from 'react';

import classes from './Login.module.css';

import { Button, Input } from '../../common';

import { Link, useHistory } from 'react-router-dom';

import {
	HOST,
	ROUTES_PATH,
	TEXT_CONSTANTS,
	URLs,
	LOCALSTORAGE_KEYS,
} from '../../constants';

import PropTypes from 'prop-types';

const Login = ({ setIsUserLoggedIn }) => {
	const [errorMsg, setErrorMsg] = useState('');

	const history = useHistory();

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const sendLoginRequest = async (credentials) => {
		setErrorMsg('');
		const response = await fetch(`${HOST}/${URLs.LOGIN}`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (response.ok) {
			localStorage.setItem(
				LOCALSTORAGE_KEYS.USER_TOKEN,
				JSON.stringify(result.result)
			);
			localStorage.setItem(
				LOCALSTORAGE_KEYS.USER_INFO,
				JSON.stringify(result.user)
			);
			setIsUserLoggedIn(true);
			history.push(ROUTES_PATH.COURSES);
		} else {
			setErrorMsg(result.result);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const email = emailInputRef.current.value;
		const password = passwordInputRef.current.value;

		const isFormValid = email !== '' && password !== '';

		if (isFormValid) {
			sendLoginRequest({ password, email });
		} else {
			alert(TEXT_CONSTANTS.ALERT_ERROR_MSG);
		}
	};

	return (
		<section className={classes.login}>
			<form onSubmit={handleSubmit} className={classes['login__form']}>
				<h1 className={classes['login__form-label']}>
					{TEXT_CONSTANTS.LOGIN_FORM_TITLE_TEXT}
				</h1>
				<div className={classes['login__form-control']}>
					<label htmlFor={TEXT_CONSTANTS.LOGIN_EMAIL_ID}>
						{TEXT_CONSTANTS.LOGIN_EMAIL_LABEL_TEXT}
					</label>
					<Input
						type='email'
						id={TEXT_CONSTANTS.LOGIN_EMAIL_ID}
						placeholder={TEXT_CONSTANTS.LOGIN_EMAIL_PLACEHOLDER_TEXT}
						reference={emailInputRef}
					/>
				</div>
				<div className={classes['login__form-control']}>
					<label htmlFor={TEXT_CONSTANTS.LOGIN_PASSWORD_ID}>
						{TEXT_CONSTANTS.LOGIN_PASSWORD_LABEL_TEXT}
					</label>
					<Input
						type='password'
						id={TEXT_CONSTANTS.LOGIN_PASSWORD_ID}
						placeholder={TEXT_CONSTANTS.LOGIN_PASSWORD_PLACEHOLDER_TEXT}
						reference={passwordInputRef}
					/>
				</div>
				{errorMsg && (
					<h3 className={classes['login__form-error-msg']}>{errorMsg}</h3>
				)}
				<div className={classes['login__form-actions']}>
					<Button text={TEXT_CONSTANTS.LOGIN_SUBMIT_BTN_TEXT} type='submit' />
				</div>
				<p>
					{TEXT_CONSTANTS.LOGIN_DISCLAIMER_TEXT}
					<Link
						className={classes['login__form-link']}
						to={ROUTES_PATH.REGISTRATION}
					>
						{TEXT_CONSTANTS.LOGIN_DISCLAIMER_LINK_TEXT}
					</Link>
				</p>
			</form>
		</section>
	);
};

Login.propTypes = {
	setIsUserLoggedIn: PropTypes.func.isRequired,
};

export default Login;
