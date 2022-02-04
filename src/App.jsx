import React, { useEffect, useState } from 'react';

import { Header, Courses, CreateCourse } from './components';

import classes from './App.module.css';

import { mockedCoursesList, mockedAuthorsList } from './constants';

const App = () => {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [searchText, setSearchText] = useState('');
	const [courses, setCourses] = useState(mockedCoursesList);
	const [filteredCourses, setFilteredCourses] = useState(courses);
	const [isCreateCourseVisible, setCreateCourseVisible] = useState(false);

	const handleSearch = (searchText) => setSearchText(searchText);

	const addAuthor = (authorId) =>
		setAuthors((prevAuthors) => [...prevAuthors, authorId]);

	const handleAddCourse = (editCourse) => {
		setCourses((prevCourses) => [...prevCourses, editCourse]);
		setCreateCourseVisible(false);
	};

	const handleShowCourse = () =>
		setCreateCourseVisible((prevVisibility) => !prevVisibility);

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
			<Header />
			<main className={classes.main}>
				{isCreateCourseVisible ? (
					<CreateCourse
						onAddAuthor={addAuthor}
						authors={authors}
						onAddCourse={handleAddCourse}
					/>
				) : (
					<Courses
						authors={authors}
						courses={filteredCourses}
						onSearchHandler={handleSearch}
						onAddHandler={handleShowCourse}
					/>
				)}
			</main>
		</>
	);
};

export default App;
