import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { businessValidation } from "../validation/business-validation";
import { duplicatedValidation } from "../validation/duplicated-validation";
import { typeValidation } from "../validation/type-validation";

import { BaseCreateUser, BaseInjectables } from "../types";

export type CreateLocalParams = BaseCreateUser;

interface InjectablesLocal extends BaseInjectables {
	VerifyAccountService: VerifyAccountService;
}

export const createLocal = async (
	params: CreateLocalParams & InjectablesLocal,
) => {
	typeValidation(params);

	businessValidation(params);

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

	const userId = user._id.toHexString();

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
