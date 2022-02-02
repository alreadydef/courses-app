export const dateGenerator = {
	getCurrenDate() {
		const currentDate = new Date();
		const monthShiftRatio = 1;
		const currentMonth = currentDate.getMonth() + monthShiftRatio;
		const currentDay = currentDate.getDate();
		const currentYear = currentDate.getFullYear();

		return `${currentDay}/${currentMonth}/${currentYear}`;
	},
};
