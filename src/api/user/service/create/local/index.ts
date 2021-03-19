import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { duplicatedValidation } from "../validation-duplicated";
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
		SettingsService,
		TutorialService,
		VerifyAccountService,
		...unformattedData
	} = params;

	await duplicatedValidation({
		UserRepository,
		username: unformattedData.username,
		email: unformattedData.email,
	});

	const userData = formatData(unformattedData);

	const user = await UserRepository.save(userData);

	const userId = user.id;

	const { tutorial, settings, verificationCode } = await createRelations({
		TutorialService,
		SettingsService,
		UserTokenService,
		VerifyAccountService,
		userId,
		suggestedLanguage: unformattedData.suggestedLanguage,
	});

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
		tutorial,
		settings,
		verificationCode,
	};
};
