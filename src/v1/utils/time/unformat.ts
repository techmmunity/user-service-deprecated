import { moment } from "./moment-instance";

type DateFormat = "DMYS" | "DMY" | "YMD" | "YMDS" | "MDY" | "MDYS";

export const unformat = (date: string, format?: DateFormat) => {
	switch (format) {
		default:
			const [year, month, day] = date.split("-").map(date => parseInt(date));

			return moment(new Date(year, month - 1, day)).toDate();
	}
};
