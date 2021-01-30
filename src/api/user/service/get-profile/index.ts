import { GameficationService } from "api/gamefication/gamefication.service";

import { getGamefication } from "./helpers/get-gamefication";
import { getUser } from "./helpers/get-user";

import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { GetProfileInput } from "api/user/inputs/get-profile.input";

import { UserRepository } from "api/user/user.entity";

interface GetProfileParams extends GetProfileInput {
	UserRepository: UserRepository;
	GameficationService: GameficationService;
}

export const getProfile = async ({
	UserRepository,
	GameficationService,
	username,
}: GetProfileParams) => {
	typeValidation(username);

	businessValidation(username);

	const user = await getUser({
		UserRepository,
		username,
	});

	const gamefication = await getGamefication({
		GameficationService,
		userId: user._id.toHexString(),
	});

	return {
		user,
		gamefication,
	};
};
