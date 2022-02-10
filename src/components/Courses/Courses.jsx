import React from 'react';

import { CourseCard, SearchBar } from './components';

import classes from './Courses.module.css';

import { getAuthorNames, pipeDuration } from '../../helpers';

import { useHistory } from 'react-router-dom';

import { ROUTES_PATH } from '../../constants';

import PropTypes from 'prop-types';

const Courses = ({ onSearchHandler, courses, authors }) => {
	const history = useHistory();

	const handleShowCourse = (id) => () => {
		history.push(`${ROUTES_PATH.COURSES}/${id}`);
	};

	const mappedCourses = courses.map((course) => (
		<CourseCard
			key={course.id}
			authors={getAuthorNames(course, authors)}
			title={course.title}
			duration={pipeDuration(course.duration)}
			description={course.description}
			creationTime={course.creationDate}
			onShowCourse={handleShowCourse(course.id)}
		/>
	));

	return (
		<section>
			<SearchBar onSearchHandler={onSearchHandler} />
			<ul className={classes['courses-list']}>{mappedCourses}</ul>
		</section>
	);
};

Courses.propTypes = {
	onSearchHandler: PropTypes.func,
	courses: PropTypes.array,
	authors: PropTypes.array,
};

export default Courses;
