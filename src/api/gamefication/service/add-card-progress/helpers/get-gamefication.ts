import { GameficationRepository } from "api/gamefication/entities/gamefication.entity";

import { ErrorUtil } from "utils/error";

import { Token } from "types/token";

interface GetGameficationParams {
	GameficationRepository: GameficationRepository;
	user: Token;
}

export const getGamefication = async ({
	GameficationRepository,
	user,
}: GetGameficationParams) => {
	const gamefication = await GameficationRepository.findOne(null, {
		where: {
			userId: user.id,
		},
		select: ["cards"],
	});

	if (!gamefication) {
		ErrorUtil.notFound("GAMEFICATION_NOT_FOUND");
	}

	return gamefication;
};
