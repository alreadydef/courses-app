import React, { useRef, useState } from 'react';

import classes from './SearchBar.module.css';
import { TEXT_CONSTANTS } from '../../../../constants';

import { Button, Input } from '../../../../common';

const SearchBar = ({ onSearchHandler, onAddHandler }) => {
	const searchInputRef = useRef();
	const [searchValue, setSearchValue] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
		onSearchHandler(searchInputRef.current.value);
	};

	const SearchChangeHandler = () => {
		setSearchValue(searchInputRef.current.value);

		if (searchInputRef.current.value === '') {
			onSearchHandler(searchInputRef.current.value);
		}
	};

	return (
		<form className={classes['search-bar']} onSubmit={submitHandler}>
			<Input
				placeholder={TEXT_CONSTANTS.SEARCH_INPUT_PLACEHOLDER}
				reference={searchInputRef}
				className={classes['search-bar__input']}
				value={searchValue}
				onChange={SearchChangeHandler}
			/>
			<Button type='submit' text={TEXT_CONSTANTS.SEARCH_BTN_TEXT} />
			<Button
				text={TEXT_CONSTANTS.ADD_NEW_COURSE_BTN_TEXT}
				onClick={onAddHandler}
				className={classes['search-bar__add-course-btn']}
			/>
		</form>
	);
};

export default SearchBar;
