import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { validate } from "../validation";
import { duplicatedValidation } from "../validation-duplicated";

import { BaseCreateUser, BaseInjectables } from "../types";

export type CreateLocalParams = BaseCreateUser;

interface InjectablesLocal extends BaseInjectables {
	VerifyAccountService: VerifyAccountService;
}

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

	const [{ tutorial, settings }, verificationCode] = await Promise.all([
		createRelations({
			TutorialService,
			SettingsService,
			UserTokenService,
			userId,
			suggestedLanguage: unformattedData.suggestedLanguage,
		}),
		VerifyAccountService.create(userId),
	]);

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
		tutorial,
		settings,
		verificationCode,
	};
};
