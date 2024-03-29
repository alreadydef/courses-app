import React, { useRef, useState } from 'react';

import classes from './CourseForm.module.css';

import { Button, Input } from '../../common';

import { dateGenerator, pipeDuration } from '../../helpers';

import {
	DURATION_ALLOWED_KEYS,
	ROUTES_PATH,
	TEXT_CONSTANTS,
} from '../../constants';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';

import { getAuthors, getCourses } from '../../selectors';

import { createAuthorAction } from '../../store/authors/thunk';
import {
	createCourseAction,
	sendUpdateCourseAction,
} from '../../store/courses/thunk';

const CourseForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { courseId } = useParams();

	const authors = useSelector(getAuthors);
	const courses = useSelector(getCourses);

	const selectedCourse = courses.find((course) => course.id === courseId) || {};

	const authorNameInputRef = useRef();
	const durationInputRef = useRef();
	const titleInputRef = useRef();
	const descriptionInputRef = useRef();

	const [title, setTitle] = useState(selectedCourse.title || '');
	const [description, setDescription] = useState(
		selectedCourse.description || ''
	);
	const [courseAuthors, setCourseAuthors] = useState(
		selectedCourse.authors || []
	);
	const [courseDuration, setCourseDuration] = useState(
		selectedCourse.duration || ''
	);

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

		if (authorName !== '') {
			dispatch(createAuthorAction(authorName));

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

		if (formIsValid && courseId) {
			dispatch(
				sendUpdateCourseAction(
					{
						title,
						description,
						duration: Number(duration),
						creationDate,
						authors: courseAuthors,
					},
					courseId
				)
			);
			history.push(ROUTES_PATH.COURSES);
		} else if (formIsValid && !courseId) {
			dispatch(
				createCourseAction({
					title,
					description,
					duration: Number(duration),
					creationDate,
					authors: courseAuthors,
				})
			);
			history.push(ROUTES_PATH.COURSES);
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
					<Button
						type='submit'
						text={
							courseId
								? TEXT_CONSTANTS.UPDATE_COURSE_TEXT
								: TEXT_CONSTANTS.CREATE_COURSE_TEXT
						}
					/>
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
									value={String(courseDuration)}
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

export default CourseForm;
