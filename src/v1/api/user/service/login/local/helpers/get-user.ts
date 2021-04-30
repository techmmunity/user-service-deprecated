import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";

import { LoginLocalParams } from "..";

interface GetUserParams extends LoginLocalParams {
	UserRepository: UserRepository;
}

const getQuery = () => {
	const byUsernameVerifingPrimaryContact =
		"users.username = $1 AND contacts.primary = TRUE";
	const byContact = "contacts.value = $1";

	return `SELECT users.id, users.pin, users.password, contacts.verified FROM users INNER JOIN contacts ON contacts.user_id=users.id WHERE (${byUsernameVerifingPrimaryContact}) OR (${byContact}) LIMIT 1`;
};

export const getUser = async ({
	UserRepository,
	identifier,
}: GetUserParams) => {
	const query = getQuery();

	const user = await UserRepository.query(query, [identifier]);

	if (user.length < 1) {
		return ErrorUtil.notFound(["User not found"]);
	}

	return user[0];
};
