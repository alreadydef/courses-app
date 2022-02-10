import React from 'react';

import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, className, type }) => {
	return (
		<button
			className={`${classes.btn} ${className || ''}`}
			type={type ? type : 'button'}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	classes: PropTypes.string,
	type: PropTypes.string,
};

export default Button;
