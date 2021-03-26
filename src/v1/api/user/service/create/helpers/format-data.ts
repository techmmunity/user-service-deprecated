import * as bcrypt from "bcrypt";
import { v4 } from "uuid";

import { UserType } from "v1/api/user/user.entity";

import { PinUtil } from "v1/utils/pin";

import { BaseCreateUser } from "../types";

type FormatDataParams = BaseCreateUser;

const getNameAndSurnames = (fullName: string) => {
	const [name, ...surnamesArray] = fullName.split(" ");

	return {
		name,
		surnames: surnamesArray.join(" "),
	};
};

const getPasswordEncrypted = (password: string) =>
	bcrypt.hashSync(password, 10);

export const formatData = ({
	email,
	username,
	avatar,
	headline,
	birthday,
	fullName,
	password,
}: FormatDataParams) => {
	const { name, surnames } = getNameAndSurnames(fullName);

	const user: UserType = {
		id: v4(),
		password: getPasswordEncrypted(password),
		pin: PinUtil.gen(),
		name,
		surnames,
		avatar,
		email,
		username,
		headline,
		birthday,
	};

	return user;
};
