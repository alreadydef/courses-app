import React from 'react';

import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

import { ROLES, ROUTES_PATH } from '../../constants';

import { useSelector } from 'react-redux';

import { getUserRole } from '../../selectors';

const PrivateRoute = ({ children, path }) => {
	const role = useSelector(getUserRole);

	return (
		<Route path={path} exact>
			{role !== '' &&
				(role === ROLES.ADMIN ? (
					children
				) : (
					<Redirect to={ROUTES_PATH.COURSES} />
				))}
		</Route>
	);
};

PrivateRoute.propTypes = {
	children: PropTypes.element.isRequired,
	path: PropTypes.string.isRequired,
};

export default PrivateRoute;
