import React from 'react';

import { CourseCard, SearchBar } from './components';

import classes from './Courses.module.css';
import { pipeDuration } from '../../helpers';

const Courses = ({ onSearchHandler, onAddHandler, courses, authors }) => {
	const switchAuthorIdsToNames = (authorIds) => {
		const authorNames = authorIds.map((authorId) => {
			const foundAuthor = authors.find((author) => author.id === authorId);

			return foundAuthor.name;
		});

		return authorNames;
	};

	const mappedCourses = courses.map((course) => (
		<CourseCard
			key={course.id}
			authors={switchAuthorIdsToNames(course.authors)}
			title={course.title}
			duration={pipeDuration(course.duration)}
			description={course.description}
			creationTime={course.creationDate}
			onShowCourse={() => console.log('show course')}
		/>
	));

	return (
		<section>
			<SearchBar
				onAddHandler={onAddHandler}
				onSearchHandler={onSearchHandler}
			/>
			<ul className={classes['courses-list']}>{mappedCourses}</ul>
		</section>
	);
};

export default Courses;
