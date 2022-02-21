import React from 'react';

import classes from './CourseCard.module.css';

import { Button } from '../../../../common';

import { TEXT_CONSTANTS } from '../../../../constants';

import editSrc from '../../../../assets/edit.png';

import deleteSrc from '../../../../assets/delete.png';

import PropTypes from 'prop-types';

const CourseCard = ({
	title,
	duration,
	creationTime,
	description,
	authors,
	onShowCourse,
	onEditCourse,
	onDeleteCourse,
}) => {
	const formattedCreationDate = creationTime.split('/').join('.');

	return (
		<li className={classes['courses-card']}>
			<div className={classes['courses-card__main-info']}>
				<h2 className={classes['main-info__title']}>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={classes['courses-card__secondary-info']}>
				<p
					className={`${classes['secondary-info__points']} ${classes['secondary-info__authors']}`}
				>
					<span className={classes['secondary-info__title']}>
						{TEXT_CONSTANTS.COURSE_CARD_AUTHORS_TEXT}
					</span>
					{authors.length > 1 ? authors.join(', ') : authors.join('')}
				</p>
				<p className={classes['secondary-info__points']}>
					<span className={classes['secondary-info__title']}>
						{TEXT_CONSTANTS.COURSE_CARD_DURATION_TEXT}
					</span>
					{duration}
				</p>
				<p className={classes['secondary-info__points']}>
					<span className={classes['secondary-info__title']}>
						{TEXT_CONSTANTS.COURSE_CARD_CREATED_TEXT}
					</span>
					{formattedCreationDate}
				</p>
				<div className={classes['secondary-info__actions']}>
					<Button
						text={TEXT_CONSTANTS.SHOW_COURSE_TEXT}
						onClick={onShowCourse}
					/>
					<Button imgSrc={editSrc} onClick={onEditCourse} />
					<Button imgSrc={deleteSrc} onClick={onDeleteCourse} />
				</div>
			</div>
		</li>
	);
};

CourseCard.propTypes = {
	title: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	creationTime: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	authors: PropTypes.array.isRequired,
	onShowCourse: PropTypes.func.isRequired,
	onEditCourse: PropTypes.func.isRequired,
	onDeleteCourse: PropTypes.func.isRequired,
};

export default CourseCard;
