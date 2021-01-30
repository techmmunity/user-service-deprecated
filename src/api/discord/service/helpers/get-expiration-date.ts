import { TimeUtil } from "utils/time";

export const getExpirationDate = (expiresIn: number) => {
	const nowMilis = TimeUtil.newDate().getTime();

	const expirationDateMilis = nowMilis + expiresIn;

	const expirationDate = TimeUtil.newDate(expirationDateMilis);

	return expirationDate;
};
