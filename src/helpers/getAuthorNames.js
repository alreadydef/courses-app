export const getAuthorNames = (course, authors) => {
	const authorNames = course.authors.map((authorId) => {
		const foundAuthor = authors.find((author) => author.id === authorId);

		return foundAuthor.name;
	});

	return authorNames;
};
