import React from 'react';

import { CourseCard, SearchBar } from './components';

import classes from './Courses.module.css';
import { pipeDuration } from '../../helpers';

const Courses = ({ onSearchHandler, onAddHandler, courses, authors }) => {
	const mappedCourses = courses.map((course) => {
		const mappedAuthors = course.authors.map((authorId) => {
			const mappedAuthor = authors.find((author) => author.id === authorId);

			return mappedAuthor.name;
		});

		return (
			<CourseCard
				key={course.id}
				authors={mappedAuthors}
				title={course.title}
				duration={pipeDuration(course.duration)}
				description={course.description}
				creationTime={course.creationDate}
				onShowCourse={() => console.log('show course')}
			/>
		);
	});

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
