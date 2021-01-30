import { GameficationRepository } from "api/gamefication/gamefication.entity";

import { ErrorUtil } from "utils/error";

interface GetUserGameficationParams {
	GameficationRepository: GameficationRepository;
	userId: string;
}

export const getUserGamefication = async ({
	GameficationRepository,
	userId,
}: GetUserGameficationParams) => {
	const user = await GameficationRepository.findOne({
		where: {
			userId,
		},
	});

	if (!user) {
		ErrorUtil.notFound("USER_NOT_FOUND");
	}

	return user;
};
