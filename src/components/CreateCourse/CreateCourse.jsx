import React, { useRef, useState } from 'react';

import classes from './CreateCourse.module.css';

import { Button, Input } from '../../common';

import { dateGenerator, pipeDuration } from '../../helpers';

import { DURATION_ALLOWED_KEYS, TEXT_CONSTANTS } from '../../constants';

import PropTypes from 'prop-types';

const CreateCourse = ({ authors, onAddAuthor, onAddCourse }) => {
	const authorNameInputRef = useRef();
	const durationInputRef = useRef();
	const titleInputRef = useRef();
	const descriptionInputRef = useRef();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseDuration, setCourseDuration] = useState('');

	const addAuthor = (authorId) => () =>
		setCourseAuthors((prevCourseAuthors) => [...prevCourseAuthors, authorId]);

	const removeAuthor = (authorId) => () =>
		setCourseAuthors((prevCourseAuthors) =>
			prevCourseAuthors.filter((courseAuthor) => courseAuthor !== authorId)
		);

	const authorsList = authors.flatMap((author) => {
		if (courseAuthors.includes(author.id)) {
			return [];
		} else {
			return [
				<li className={classes['author-list__item']} key={author.id}>
					{author.name}
					<Button
						text={TEXT_CONSTANTS.ADD_AUTHOR_BTN_TEXT}
						onClick={addAuthor(author.id)}
					/>
				</li>,
			];
		}
	});

	const courseAuthorsList = courseAuthors.map((authorId) => {
		const mappedAuthor = authors.find((author) => author.id === authorId);

		return (
			<li className={classes['author-list__item']} key={authorId}>
				{mappedAuthor.name}
				<Button
					text={TEXT_CONSTANTS.DELETE_AUTHOR_BTN_TEXT}
					onClick={removeAuthor(mappedAuthor.id)}
				/>
			</li>
		);
	});

	const handleCreateAuthor = () => {
		const authorName = authorNameInputRef.current.value;
		const uniqueId = String(Math.floor(Math.random() * new Date()));

		if (authorName !== '') {
			onAddAuthor({
				id: uniqueId,
				name: authorName,
			});
			authorNameInputRef.current.value = '';
		}
	};

	const handleDurationChange = () =>
		setCourseDuration(durationInputRef.current.value);

	const handleDurationKeydown = (event) => {
		if (!DURATION_ALLOWED_KEYS.some((key) => key === event.key)) {
			event.preventDefault();
		}
	};

	const handleTitleChange = () => setTitle(titleInputRef.current.value);

	const handleDescriptionChange = () =>
		setDescription(descriptionInputRef.current.value);

	const handleSubmitForm = (event) => {
		event.preventDefault();
		const title = titleInputRef.current.value;
		const description = descriptionInputRef.current.value;
		const duration = durationInputRef.current.value;
		const id = String(Math.floor(Math.random() * new Date()));
		const creationDate = dateGenerator.getCurrentDate();

		const titleInputIsValid = title.length > 0;
		const descriptionInputIsValid = description.length > 0;
		const durationInputIsValid = duration.length > 0;
		const authorsIsNotEmpty = courseAuthors.length > 0;

		const formIsValid =
			titleInputIsValid &&
			descriptionInputIsValid &&
			durationInputIsValid &&
			authorsIsNotEmpty;

		if (formIsValid) {
			onAddCourse({
				id: id,
				title: title,
				description: description,
				duration: Number(duration),
				creationDate: creationDate,
				authors: courseAuthors,
			});
		} else {
			alert(TEXT_CONSTANTS.ALERT_ERROR_MSG);
		}
	};

	return (
		<section>
			<form onSubmit={handleSubmitForm}>
				<div className={classes['title-row']}>
					<div className={classes['form-control']}>
						<label htmlFor='title'>{TEXT_CONSTANTS.TITLE_LABEL_TEXT}</label>
						<Input
							reference={titleInputRef}
							className={classes['form-control__input']}
							placeholder={TEXT_CONSTANTS.TITLE_PLACEHOLDER_TEXT}
							id='title'
							value={title}
							onChange={handleTitleChange}
						/>
					</div>
					<Button type='submit' text={TEXT_CONSTANTS.CREATE_COURSE_TEXT} />
				</div>
				<div className={classes['form-control']}>
					<label htmlFor='description'>Description</label>
					<textarea
						ref={descriptionInputRef}
						className={classes['form-control__textarea']}
						id='description'
						rows='15'
						placeholder='description text'
						value={description}
						onChange={handleDescriptionChange}
					/>
				</div>
				<div className={classes['create-author']}>
					<div className={classes['create-author__row']}>
						<div
							className={`${classes['create-author__column']} ${classes['create-author__add-name-column']}`}
						>
							<h3 className={classes['create-author__title']}>
								{TEXT_CONSTANTS.ADD_AUTHOR_TITLE}
							</h3>
							<div className={classes['form-control']}>
								<label htmlFor='author'>
									{TEXT_CONSTANTS.AUTHOR_NAME_LABEL}
								</label>
								<Input
									reference={authorNameInputRef}
									placeholder={TEXT_CONSTANTS.AUTHOR_NAME_PLACEHOLDER_TEXT}
									id='author'
								/>
							</div>
							<Button
								onClick={handleCreateAuthor}
								className={classes['create-author__add-name-btn']}
								text={TEXT_CONSTANTS.CREATE_AUTHOR_BTN_TEXT}
							/>
						</div>
						<div className={classes['create-author__column']}>
							<h3 className={classes['create-author__title']}>
								{TEXT_CONSTANTS.AUTHORS_TITLE_TEXT}
							</h3>
							<ul className={classes['author-list']}>{authorsList}</ul>
						</div>
					</div>
					<div className={classes['create-author__row']}>
						<div className={classes['create-author__column']}>
							<h3 className={classes['create-author__title']}>
								{TEXT_CONSTANTS.DURATION_TITLE_TEXT}
							</h3>
							<div className={classes['form-control']}>
								<label htmlFor='duration'>
									{TEXT_CONSTANTS.DURATION_LABEL_TEXT}
								</label>
								<Input
									onKeydown={handleDurationKeydown}
									onChange={handleDurationChange}
									reference={durationInputRef}
									placeholder={TEXT_CONSTANTS.DURATION_PLACEHOLDER_TEXT}
									id='duration'
									value={courseDuration}
								/>
							</div>
						</div>
						<div className={classes['create-author__column']}>
							<h3 className={classes['create-author__title']}>
								{TEXT_CONSTANTS.COURSE_AUTHORS_TITLE}
							</h3>
							{courseAuthorsList.length > 0 ? (
								<ul className={classes['author-list']}>{courseAuthorsList}</ul>
							) : (
								<p className={classes['author-list__empty-msg']}>
									{TEXT_CONSTANTS.EMPTY_AUTHORS_LIST_MSG}
								</p>
							)}
						</div>
					</div>
					<div className={classes['create-author__row']}>
						<p className={classes['create-author__duration-msg']}>
							<span>{TEXT_CONSTANTS.DURATION_MSG}</span>
							<span>
								{courseDuration && pipeDuration(Number(courseDuration))}
							</span>
						</p>
					</div>
				</div>
			</form>
		</section>
	);
};

CreateCourse.propTypes = {
	authors: PropTypes.array.isRequired,
	onAddAuthor: PropTypes.func.isRequired,
	onAddCourse: PropTypes.func.isRequired,
};

export default CreateCourse;
