import React from 'react';

import classes from './Button.module.css';
import PropTypes from 'prop-types';
import { TEXT_CONSTANTS } from '../../constants';

const Button = ({ text, onClick, className, type, imgSrc }) => {
	return (
		<button
			className={`${classes.btn} ${className || ''}`}
			type={type ? type : 'button'}
			onClick={onClick}
		>
			{text ? (
				text
			) : (
				<img
					className={`${classes['btn__img-content']}`}
					src={imgSrc}
					alt={TEXT_CONSTANTS.BUTTON_ALT_TEXT}
				/>
			)}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	classes: PropTypes.string,
	type: PropTypes.string,
	imgSrc: PropTypes.string,
};

export default Button;
