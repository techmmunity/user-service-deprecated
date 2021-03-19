import { moment } from "./moment-instance";

export const newDate = (date?: moment.MomentInput) => {
	return moment(date).toDate();
};
