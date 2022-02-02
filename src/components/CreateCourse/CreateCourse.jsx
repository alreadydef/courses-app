import React, { useRef, useState } from 'react';

import classes from './CreateCourse.module.css';

import { Button, Input } from '../../common';

import { dateGenerator, pipeDuration } from '../../helpers';

import { DURATION_ALLOWED_KEYS, TEXT_CONSTANTS } from '../../constants';

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

	const authorsList = authors
		.filter((author) => !courseAuthors.includes(author.id))
		.map((author) => (
			<li className={classes['author-list__item']} key={author.id}>
				{author.name}
				<Button
					text={TEXT_CONSTANTS.ADD_AUTHOR_BTN_TEXT}
					onClick={addAuthor(author.id)}
				/>
			</li>
		));

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

	const createAuthorHandler = () => {
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

	const durationChangeHandler = () =>
		setCourseDuration(durationInputRef.current.value);

	const durationKeydownHandler = (event) => {
		if (!DURATION_ALLOWED_KEYS.some((key) => key === event.key)) {
			event.preventDefault();
		}
	};

	const titleChangeHandler = () => setTitle(titleInputRef.current.value);

	const descriptionChangeHandler = () =>
		setDescription(descriptionInputRef.current.value);

	const submitFormHandler = (event) => {
		event.preventDefault();
		const titleValue = titleInputRef.current.value;
		const descriptionValue = descriptionInputRef.current.value;
		const durationValue = durationInputRef.current.value;
		const id = String(Math.floor(Math.random() * new Date()));
		const creationDate = dateGenerator.getCurrenDate();

		const titleInputIsValid = titleValue.length > 0;
		const descriptionInputIsValid = descriptionValue.length > 0;
		const durationInputIsValid = durationValue.length > 0;
		const authorsIsNotEmpty = courseAuthors.length > 0;

		const formIsValid =
			titleInputIsValid &&
			descriptionInputIsValid &&
			durationInputIsValid &&
			authorsIsNotEmpty;

		if (formIsValid) {
			onAddCourse({
				id: id,
				title: titleValue,
				description: descriptionValue,
				duration: Number(durationValue),
				creationDate: creationDate,
				authors: courseAuthors,
			});
		} else {
			alert(TEXT_CONSTANTS.ALERT_ERROR_MSG);
		}
	};

	return (
		<section>
			<form onSubmit={submitFormHandler}>
				<div className={classes['title-row']}>
					<div className={classes['form-control']}>
						<label htmlFor='title'>{TEXT_CONSTANTS.TITLE_LABEL_TEXT}</label>
						<Input
							reference={titleInputRef}
							className={classes['form-control__input']}
							placeholder={TEXT_CONSTANTS.TITLE_PLACEHOLDER_TEXT}
							id='title'
							value={title}
							onChange={titleChangeHandler}
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
						onChange={descriptionChangeHandler}
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
								onClick={createAuthorHandler}
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
									onKeydown={durationKeydownHandler}
									onChange={durationChangeHandler}
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

export default CreateCourse;
