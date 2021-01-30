import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { GameficationRepository } from "api/gamefication/entities/gamefication.entity";

interface CreateGameficationParams {
	GameficationRepository: GameficationRepository;
	userId: string;
}

export const create = ({
	GameficationRepository,
	userId,
}: CreateGameficationParams) => {
	typeValidation(userId);

	businessValidation(userId);

	return GameficationRepository.save({
		userId,
		level: 1,
		xp: 0,
		totalXp: 0,
		bytes: 0,
		megabytes: 0,
		cards: [],
	});
};
