import React, { useEffect, useState } from 'react';

import { CourseCard, SearchBar } from './components';

import classes from './Courses.module.css';

import { getAuthorNames, pipeDuration } from '../../helpers';

import { useHistory } from 'react-router-dom';

import { ROLES, ROUTES_PATH } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';

import { getAuthors, getCourses, getUserRole } from '../../selectors';

import { removeCourseAction } from '../../store/courses/thunk';

const Courses = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const userRole = useSelector(getUserRole);

	const [searchText, setSearchText] = useState('');
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const handleSearch = (searchText) => setSearchText(searchText);

	const handleShowCourse = (id) => () => {
		history.push(`${ROUTES_PATH.COURSES}/${id}`);
	};

	const handleEditCourse = (id) => () => {
		history.push(`${ROUTES_PATH.COURSES}/update/${id}`);
	};

	const handleDeleteCourse = (id) => () => {
		dispatch(removeCourseAction(id));
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

	const courseCards = filteredCourses.map((course) => (
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
			isAdminRole={userRole === ROLES.ADMIN}
		/>
	));

	return (
		<section>
			<SearchBar
				onSearchHandler={handleSearch}
				isAdminRole={userRole === ROLES.ADMIN}
			/>
			<ul className={classes['courses-list']}>{courseCards}</ul>
		</section>
	);
};

export default Courses;
