import { UserRepository } from "v1/api/user/user.entity";

import { errorUtil } from "v1/utils/error";

import { LoginLocalParams } from "..";

interface GetUserParams extends LoginLocalParams {
	userRepository: UserRepository;
}

interface QueryReturn {
	id: string;
	pin: string;
	password: string;
	verified: boolean;
}

const getQuery = () => {
	const byUsernameVerifingPrimaryContact =
		"users.username = $1 AND contacts.primary = TRUE";
	const byContact = "contacts.value = $1";

	return `SELECT users.id, users.pin, users.password, contacts.verified FROM users INNER JOIN contacts ON contacts.user_id=users.id WHERE (${byUsernameVerifingPrimaryContact}) OR (${byContact}) LIMIT 1`;
};

export const getUser = async ({
	userRepository,
	identifier,
}: GetUserParams) => {
	const query = getQuery();

	const user = (await userRepository.query(query, [
		identifier,
	])) as Array<QueryReturn>;

	if (user.length < 1) {
		return errorUtil.notFound(["User not found"]);
	}

	return user.shift();
};
