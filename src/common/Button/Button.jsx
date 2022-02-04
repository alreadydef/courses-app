import React from 'react';

import classes from './Button.module.css';

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

export default Button;
