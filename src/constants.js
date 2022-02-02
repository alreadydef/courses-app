export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
 has been the industry's standard dummy text ever since the
1500s, when an unknown
 printer took a galley of type and scrambled it to make a type
specimen book. It has survived
 not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
 has been the industry's standard dummy text ever since the
1500s, when an unknown
 printer took a galley of type and scrambled it to make a type
specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const TEXT_CONSTANTS = {
	ACCOUNT_TEXT: 'Dave',
	LOGOUT_BTN_TEXT: 'Logout',
	LOGO_ALT_TEXT: 'logo image',
	SEARCH_BTN_TEXT: 'Search',
	ADD_NEW_COURSE_BTN_TEXT: 'Add new course',
	SEARCH_INPUT_PLACEHOLDER: 'Enter course name...',
	SHOW_COURSE_TEXT: 'Show course',
	COURSE_CARD_AUTHORS_TEXT: 'Authors: ',
	COURSE_CARD_DURATION_TEXT: 'Duration: ',
	COURSE_CARD_CREATED_TEXT: 'Created: ',
	ADD_AUTHOR_BTN_TEXT: 'Add author',
	DELETE_AUTHOR_BTN_TEXT: 'Delete author',
	ALERT_ERROR_MSG: 'Please, fill in all fields',
	TITLE_LABEL_TEXT: 'title',
	TITLE_PLACEHOLDER_TEXT: 'Enter title...',
	CREATE_COURSE_TEXT: 'Create course',
	DESCRIPTION_LABEL_TEXT: 'Description',
	DESCRIPTION_PLACEHOLDER_TEXT: 'enter course description...',
	ADD_AUTHOR_TITLE: 'Add author',
	AUTHOR_NAME_LABEL: 'Author name',
	AUTHOR_NAME_PLACEHOLDER_TEXT: 'Enter another name...',
	CREATE_AUTHOR_BTN_TEXT: 'Create author',
	AUTHORS_TITLE_TEXT: 'Authors',
	DURATION_TITLE_TEXT: 'Duration',
	DURATION_LABEL_TEXT: 'Duration',
	DURATION_PLACEHOLDER_TEXT: 'Enter duration...',
	DURATION_MSG: 'Duration: ',
	COURSE_AUTHORS_TITLE: 'Course authors',
	EMPTY_AUTHORS_LIST_MSG: 'Author list is empty',
};

export const DURATION_ALLOWED_KEYS = [
	'Backspace',
	'ArrowLeft',
	'ArrowRight',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
];