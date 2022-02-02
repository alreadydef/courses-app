import React from 'react';

import classes from './Input.module.css';

const Input = ({
	placeholder,
	className,
	reference,
	value,
	onChange,
	id,
	onKeydown,
}) => {
	return (
		<input
			id={id}
			onChange={onChange}
			onKeyDown={onKeydown}
			value={value}
			ref={reference}
			placeholder={placeholder}
			className={`${classes.input} ${className ? className : ''}`}
		/>
	);
};

export default Input;
