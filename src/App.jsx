import React, { useEffect, useState } from 'react';

import {
	Header,
	Courses,
	CreateCourse,
	Registration,
	Login,
	CourseInfo,
} from './components';

import classes from './App.module.css';

import { mockedCoursesList, mockedAuthorsList, ROUTES_PATH } from './constants';

import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useLoggedInStatus } from './hooks';

const App = () => {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [searchText, setSearchText] = useState('');
	const [courses, setCourses] = useState(mockedCoursesList);
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const [isUserLoggedIn, handleLogout, setIsUserLoggedIn] = useLoggedInStatus();

	const history = useHistory();

	const handleSearch = (searchText) => setSearchText(searchText);

	const addAuthor = (authorId) =>
		setAuthors((prevAuthors) => [...prevAuthors, authorId]);

	const handleAddCourse = (editCourse) => {
		setCourses((prevCourses) => [...prevCourses, editCourse]);
		history.push(ROUTES_PATH.COURSES);
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

	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} handleLogout={handleLogout} />
			<main className={classes.main}>
				<Switch>
					<Route path={ROUTES_PATH.HOME} exact>
						<Redirect
							to={isUserLoggedIn ? ROUTES_PATH.COURSES : ROUTES_PATH.LOGIN}
						/>
					</Route>
					<Route path={ROUTES_PATH.LOGIN}>
						<Login setIsUserLoggedIn={setIsUserLoggedIn} />
					</Route>
					<Route path={ROUTES_PATH.REGISTRATION}>
						<Registration />
					</Route>
					<Route path={ROUTES_PATH.ADD_COURSE} exact>
						<CreateCourse
							authors={authors}
							onAddAuthor={addAuthor}
							onAddCourse={handleAddCourse}
						/>
					</Route>
					<Route path={ROUTES_PATH.COURSES} exact>
						<Courses
							authors={authors}
							courses={filteredCourses}
							onSearchHandler={handleSearch}
						/>
					</Route>
					<Route path={ROUTES_PATH.COURSE_INFO}>
						<CourseInfo courses={courses} authors={authors} />
					</Route>
				</Switch>
			</main>
		</>
	);
};

export default App;
