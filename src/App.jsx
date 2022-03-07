import React, { useEffect } from 'react';

import {
	Header,
	Courses,
	CourseForm,
	Registration,
	Login,
	CourseInfo,
	PrivateRoute,
} from './components';

import classes from './App.module.css';

import { LOCALSTORAGE_KEYS, ROUTES_PATH } from './constants';

import { Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { loginUserAction } from './store/user/actionCreators';

import { sendRoleRequestAction } from './store/user/thunk';
import { fetchAllAuthorsAction } from './store/authors/thunk';
import { fetchAllCourses } from './store/courses/thunk';

const App = () => {
	const token = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.USER_TOKEN));
	const dispatch = useDispatch();

	useEffect(() => {
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

			dispatch(sendRoleRequestAction(token));
		}
	}, [dispatch, token]);

	useEffect(() => {
		dispatch(fetchAllAuthorsAction);
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAllCourses);
	}, [dispatch]);

	return (
		<>
			<Header />
			<main className={classes.main}>
				<Switch>
					<Route path={ROUTES_PATH.HOME} exact>
						<Redirect to={token ? ROUTES_PATH.COURSES : ROUTES_PATH.LOGIN} />
					</Route>
					<Route path={ROUTES_PATH.LOGIN}>
						<Login />
					</Route>
					<Route path={ROUTES_PATH.REGISTRATION}>
						<Registration />
					</Route>
					<PrivateRoute path={ROUTES_PATH.ADD_COURSE}>
						<CourseForm />
					</PrivateRoute>
					<PrivateRoute path={ROUTES_PATH.UPDATE_COURSE}>
						<CourseForm />
					</PrivateRoute>
					<Route path={ROUTES_PATH.COURSES} exact>
						<Courses />
					</Route>
					<Route path={ROUTES_PATH.COURSE_INFO} exact>
						<CourseInfo />
					</Route>
				</Switch>
			</main>
		</>
	);
};

export default App;
