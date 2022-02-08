import React, { useRef, useState } from 'react';

import classes from './Registration.module.css';
import { Button, Input } from '../../common';
import { Link, useHistory } from 'react-router-dom';

import { HOST, ROUTES_PATH, TEXT_CONSTANTS, URLs } from '../../constants';

const Registration = () => {
	const [errorMsg, setErrorMsg] = useState('');

	const history = useHistory();

	const nameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const sendRegisterRequest = async (credentials) => {
		setErrorMsg('');
		const response = await fetch(`${HOST}/${URLs.REGISTER}`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();

		if (response.ok) {
			history.push(ROUTES_PATH.LOGIN);
		} else {
			setErrorMsg(result.errors.join('\n'));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const name = nameInputRef.current.value;
		const email = emailInputRef.current.value;
		const password = passwordInputRef.current.value;

		const isFormValid = name !== '' && email !== '' && password !== '';

		if (isFormValid) {
			sendRegisterRequest({ name, password, email });
		} else {
			alert(TEXT_CONSTANTS.ALERT_ERROR_MSG);
		}
	};

	return (
		<section className={classes.registration}>
			<form onSubmit={handleSubmit} className={classes['registration__form']}>
				<h1 className={classes['registration__form-label']}>
					{TEXT_CONSTANTS.REGISTRATION_FORM_TITLE_TEXT}
				</h1>
				<div className={classes['registration__form-control']}>
					<label htmlFor={TEXT_CONSTANTS.REGISTRATION_NAME_ID}>
						{TEXT_CONSTANTS.REGISTRATION_NAME_LABEL_TEXT}
					</label>
					<Input
						id={TEXT_CONSTANTS.REGISTRATION_NAME_ID}
						placeholder={TEXT_CONSTANTS.REGISTRATION_NAME_PLACEHOLDER_TEXT}
						reference={nameInputRef}
					/>
				</div>
				<div className={classes['registration__form-control']}>
					<label htmlFor={TEXT_CONSTANTS.REGISTRATION_EMAIL_ID}>
						{TEXT_CONSTANTS.REGISTRATION_EMAIL_LABEL_TEXT}
					</label>
					<Input
						id={TEXT_CONSTANTS.REGISTRATION_EMAIL_ID}
						placeholder={TEXT_CONSTANTS.REGISTRATION_EMAIL_PLACEHOLDER_TEXT}
						reference={emailInputRef}
						type='email'
					/>
				</div>
				<div className={classes['registration__form-control']}>
					<label htmlFor={TEXT_CONSTANTS.REGISTRATION_PASSWORD_ID}>
						{TEXT_CONSTANTS.REGISTRATION_PASSWORD_LABEL_TEXT}
					</label>
					<Input
						id={TEXT_CONSTANTS.REGISTRATION_PASSWORD_ID}
						placeholder={TEXT_CONSTANTS.REGISTRATION_PASSWORD_PLACEHOLDER_TEXT}
						reference={passwordInputRef}
						type='password'
					/>
				</div>
				{errorMsg && (
					<p className={classes['registration__form-error-msg']}>{errorMsg}</p>
				)}
				<div className={classes['registration__form-actions']}>
					<Button
						type='submit'
						text={TEXT_CONSTANTS.REGISTRATION_SUBMIT_BTN_TEXT}
					/>
				</div>
				<p>
					{TEXT_CONSTANTS.REGISTRATION_DISCLAIMER_TEXT}
					<Link
						className={classes['registration__form__link']}
						to={ROUTES_PATH.LOGIN}
					>
						{TEXT_CONSTANTS.REGISTRATION_DISCLAIMER_LINK_TEXT}
					</Link>
				</p>
			</form>
		</section>
	);
};

export default Registration;
