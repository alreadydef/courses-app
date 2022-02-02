export const pipeDuration = (duration) => {
	const hoursRatio = 60;
	const hours = Math.floor(duration / hoursRatio);
	const minutes = duration % hoursRatio;

	return `${hours}:${minutes} hours`;
};
