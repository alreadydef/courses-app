import React, { useEffect, useState } from 'react';

import { CourseCard, SearchBar } from './components';

import classes from './Courses.module.css';

import { getAuthorNames, pipeDuration } from '../../helpers';

import { useHistory } from 'react-router-dom';

import { ROUTES_PATH } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';

import { getAuthors, getCourses } from '../../selectors';
import { doDeleteCourse } from '../../store/courses/actionCreators';

const Courses = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const [searchText, setSearchText] = useState('');
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const handleSearch = (searchText) => setSearchText(searchText);

	const handleShowCourse = (id) => () => {
		history.push(`${ROUTES_PATH.COURSES}/${id}`);
	};

	const handleEditCourse = (id) => () => {};

	const handleDeleteCourse = (id) => () => {
		dispatch(doDeleteCourse(id));
	};

	useEffect(() => {
		setFilteredCourses(courses);
		if (searchText.length !== 0) {
			setFilteredCourses((prevCourse) =>
				prevCourse.filter((course) => {
					return (
						course.title.includes(searchText) || course.id.includes(searchText)
					);
				})
			);
		}
	}, [searchText, courses]);

	const mappedCourses = filteredCourses.map((course) => (
		<CourseCard
			key={course.id}
			authors={getAuthorNames(course, authors)}
			title={course.title}
			duration={pipeDuration(course.duration)}
			description={course.description}
			creationTime={course.creationDate}
			onShowCourse={handleShowCourse(course.id)}
			onDeleteCourse={handleDeleteCourse(course.id)}
			onEditCourse={handleEditCourse(course.id)}
		/>
	));

	return (
		<section>
			<SearchBar onSearchHandler={handleSearch} />
			<ul className={classes['courses-list']}>{mappedCourses}</ul>
		</section>
	);
};

export default Courses;
