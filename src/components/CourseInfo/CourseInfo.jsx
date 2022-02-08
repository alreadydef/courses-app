import React from 'react';

import classes from './CourseInfo.module.css';

import { Link, useParams } from 'react-router-dom';

import { ROUTES_PATH, TEXT_CONSTANTS } from '../../constants';

import { pipeDuration } from '../../helpers';

import PropTypes from 'prop-types';

const CourseInfo = ({ courses, authors }) => {
	const params = useParams();
	const course = courses.find((course) => course.id === params.courseId);

	const authorNames = course.authors.map((authorId) => {
		const foundAuthor = authors.find((author) => author.id === authorId);

		return foundAuthor.name;
	});

	return (
		<section className={classes['course-info']}>
			<div>
				<Link
					className={classes['course-info__back-link']}
					to={ROUTES_PATH.COURSES}
				>
					{TEXT_CONSTANTS.COURSE_INFO_BACK_LINK_TEXT}
				</Link>
			</div>
			<h1 className={classes['course-info__title']}>{course.title}</h1>
			<div className={classes['course-info__content']}>
				<p className={classes['course-info__description']}>
					{course.description}
				</p>
				<div className={classes['course-info__properties']}>
					<p>
						<span className={classes['course-info__label']}>
							{TEXT_CONSTANTS.COURSE_CARD_ID_TEXT}
						</span>
						{course.id}
					</p>
					<p>
						<span className={classes['course-info__label']}>
							{TEXT_CONSTANTS.COURSE_CARD_DURATION_TEXT}
						</span>
						{pipeDuration(course.duration)}
					</p>
					<p>
						<span className={classes['course-info__label']}>
							{TEXT_CONSTANTS.COURSE_CARD_CREATED_TEXT}
						</span>
						{course.creationDate.split('/').join('.')}
					</p>
					<p>
						<span className={classes['course-info__label']}>
							{TEXT_CONSTANTS.COURSE_CARD_AUTHORS_TEXT}
						</span>
						{authorNames.length > 1
							? authorNames.join(', ')
							: authorNames.join('')}
					</p>
				</div>
			</div>
		</section>
	);
};

CourseInfo.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
};

export default CourseInfo;
