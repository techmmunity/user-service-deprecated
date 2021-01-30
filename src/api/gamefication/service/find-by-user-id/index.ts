import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { GameficationRepository } from "api/gamefication/entities/gamefication.entity";

interface FindByUserIdParams {
	GameficationRepository: GameficationRepository;
	userId: string;
}

export const findByUserId = ({
	GameficationRepository,
	userId,
}: FindByUserIdParams) => {
	typeValidation(userId);

	businessValidation(userId);

	return GameficationRepository.findOne({
		where: {
			userId,
		},
	});
};
