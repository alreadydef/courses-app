import React from 'react';

import classes from './Input.module.css';

import PropTypes from 'prop-types';

const Input = ({
	placeholder,
	className,
	reference,
	value,
	onChange,
	id,
	onKeydown,
	type,
}) => {
	return (
		<input
			id={id}
			onChange={onChange}
			onKeyDown={onKeydown}
			value={value}
			ref={reference}
			placeholder={placeholder}
			className={`${classes.input} ${className || ''}`}
			type={type || 'text'}
		/>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string,
	className: PropTypes.string,
	reference: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	value: PropTypes.string,
	onChange: PropTypes.func,
	id: PropTypes.string,
	onKeyDown: PropTypes.func,
	type: PropTypes.string,
};

export default Input;
