import React, { useEffect, useRef } from 'react';

import {
	Header,
	Courses,
	CreateCourse,
	Registration,
	Login,
	CourseInfo,
} from './components';

import classes from './App.module.css';

import { LOCALSTORAGE_KEYS, ROUTES_PATH } from './constants';

import { Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getAllAuthors, getAllCourses } from './services';

import { getAllCoursesAction } from './store/courses/actionCreators';

import { getAllAuthorsAction } from './store/authors/actionCreators';
import { loginUserAction } from './store/user/actionCreators';
import { getUserAuthStatus } from './selectors';

const App = () => {
	const isUserLoggedIn = useSelector(getUserAuthStatus);
	const dispatch = useDispatch();
	const retrieveTokenCounterRef = useRef(0);

	useEffect(() => {
		getAllAuthors()
			.then((response) => response.json())
			.then((data) => dispatch(getAllAuthorsAction(data.result)));
	}, [dispatch]);

	useEffect(() => {
		getAllCourses()
			.then((response) => response.json())
			.then((data) => dispatch(getAllCoursesAction(data.result)));
	}, [dispatch]);

	useEffect(() => {
		const token = localStorage.getItem(LOCALSTORAGE_KEYS.USER_TOKEN);
		const userData = JSON.parse(
			localStorage.getItem(LOCALSTORAGE_KEYS.USER_INFO)
		);

		if (token && userData) {
			dispatch(
				loginUserAction({
					token: token,
					name: userData.name,
					email: userData.email,
				})
			);
		}
		retrieveTokenCounterRef.current++;
	}, [dispatch]);

	return (
		<>
			<Header />
			<main className={classes.main}>
				<Switch>
					<Route path={ROUTES_PATH.HOME} exact>
						{retrieveTokenCounterRef.current > 0 && (
							<Redirect
								to={isUserLoggedIn ? ROUTES_PATH.COURSES : ROUTES_PATH.LOGIN}
							/>
						)}
					</Route>
					<Route path={ROUTES_PATH.LOGIN}>
						<Login />
					</Route>
					<Route path={ROUTES_PATH.REGISTRATION}>
						<Registration />
					</Route>
					<Route path={ROUTES_PATH.ADD_COURSE} exact>
						<CreateCourse />
					</Route>
					<Route path={ROUTES_PATH.COURSES} exact>
						<Courses />
					</Route>
					<Route path={ROUTES_PATH.COURSE_INFO}>
						<CourseInfo />
					</Route>
				</Switch>
			</main>
		</>
	);
};

export default App;
