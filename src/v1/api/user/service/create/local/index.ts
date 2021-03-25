import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { validate } from "./validation";

import { BaseCreateUser, BaseInjectables } from "../types";

export type CreateLocalParams = BaseCreateUser;

type InjectablesLocal = BaseInjectables;

export const createLocal = async (
	params: CreateLocalParams & InjectablesLocal,
) => {
	await validate(params);

	const {
		UserRepository,
		UserTokenService,
		VerifyAccountService,
		...unformattedData
	} = params;

	const userData = formatData(unformattedData);

	const user = await UserRepository.save(userData);

	const userId = user.id;

	const { verificationCode } = await createRelations({
		UserTokenService,
		VerifyAccountService,
		userId,
	});

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
		verificationCode,
	};
};
