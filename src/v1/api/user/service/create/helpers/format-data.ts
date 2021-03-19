import * as bcrypt from "bcrypt";
import { v4 } from "uuid";

import { generatePIN } from "../../helpers/generate-pin";

import { UserType } from "v1/api/user/user.entity";

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

	const id = v4();

	const user: UserType = {
		id,
		name,
		surnames,
		email,
		username,
		headline,
		birthday,
		verified: false,
		password: getPasswordEncrypted(password),
		pin: generatePIN(),
	};

	if (avatar) {
		user.avatar = avatar;
	}

	return user as UserType;
};
