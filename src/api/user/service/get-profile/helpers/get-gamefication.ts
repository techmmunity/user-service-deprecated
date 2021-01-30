import { GameficationService } from "api/gamefication/gamefication.service";

import { ErrorUtil } from "utils/error";

interface GetGameficationParams {
	GameficationService: GameficationService;
	userId: string;
}

export const getGamefication = async ({
	GameficationService,
	userId,
}: GetGameficationParams) => {
	const gamefication = await GameficationService.findByUserId(userId);

	if (!gamefication) {
		ErrorUtil.notFound("USER_NOT_FOUND");
	}

	return gamefication;
};
