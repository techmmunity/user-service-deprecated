import { newDate } from "./new-date";

export const getAge = (birthday: Date) => {
	const ageDiff = newDate().getTime() - birthday.getTime();

	const ageDate = newDate(ageDiff);

	return Math.abs(ageDate.getUTCFullYear() - 1970);
};
