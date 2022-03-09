import React, { useRef, useState } from 'react';

import classes from './SearchBar.module.css';

import { ROUTES_PATH, TEXT_CONSTANTS } from '../../../../constants';

import { Button, Input } from '../../../../common';

import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

const SearchBar = ({ onSearchHandler, isAdminRole }) => {
	const searchInputRef = useRef();
	const history = useHistory();
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSearchHandler(searchInputRef.current.value);
	};

	const handleSearchChange = () => {
		setSearchValue(searchInputRef.current.value);

		if (searchInputRef.current.value === '') {
			onSearchHandler(searchInputRef.current.value);
		}
	};

	const handleAddCourse = () => history.push(ROUTES_PATH.ADD_COURSE);

	return (
		<form className={classes['search-bar']} onSubmit={handleSubmit}>
			<Input
				placeholder={TEXT_CONSTANTS.SEARCH_INPUT_PLACEHOLDER}
				reference={searchInputRef}
				className={classes['search-bar__input']}
				value={searchValue}
				onChange={handleSearchChange}
			/>
			<Button type='submit' text={TEXT_CONSTANTS.SEARCH_BTN_TEXT} />
			{isAdminRole && (
				<Button
					text={TEXT_CONSTANTS.ADD_NEW_COURSE_BTN_TEXT}
					onClick={handleAddCourse}
					className={classes['search-bar__add-course-btn']}
				/>
			)}
		</form>
	);
};

SearchBar.propTypes = {
	onSearchHandler: PropTypes.func.isRequired,
	isAdminRole: PropTypes.bool.isRequired,
};

export default SearchBar;
