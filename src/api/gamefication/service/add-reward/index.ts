import { calcLevel } from "./calc-level";
import { getReward, Reward } from "./rewards";

import { getUserGamefication } from "./helpers/get-user-gamefication";

import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import {
	GameficationLogRepository,
	GameficationLogType,
} from "api/gamefication/entities/gamefication-log.entity";
import {
	GameficationEntity,
	GameficationRepository,
	GameficationType,
} from "api/gamefication/entities/gamefication.entity";

import { GameficationLogEnum } from "types/enums/gamefication-log";

import { Token } from "types/token";

export interface AddRewardParams {
	GameficationRepository: GameficationRepository;
	GameficationLogRepository: GameficationLogRepository;
	user: Token;
	reason: GameficationLogEnum;
	options?: Reward;
}

export const addReward = async ({
	GameficationLogRepository,
	GameficationRepository,
	user,
	reason,
	options,
}: AddRewardParams) => {
	typeValidation(reason);

	businessValidation(reason);

	const reward = getReward(reason, options);

	const userGamefication = await getUserGamefication({
		GameficationRepository,
		userId: user.id,
	});

	const log: GameficationLogType = {
		reason,
		userId: user.id,
	};

	const updatedGamefication: Partial<GameficationType> = {};

	if (reward.xp) {
		const { levelUps, newCurrentLvl, newCurrentXp } = calcLevel({
			xpToAdd: reward.xp,
			currentLvl: userGamefication.level,
			currentXp: userGamefication.xp,
		});

		updatedGamefication.level = newCurrentLvl;
		updatedGamefication.xp = newCurrentXp;
		log.xp = reward.xp;

		if (levelUps) log.levelUps = levelUps;
	}

	if (reward.bytes) {
		log.bytes = reward.bytes;
		updatedGamefication.bytes += reward.bytes;
	}

	if (reward.megabytes) {
		log.megabytes = reward.megabytes;
		updatedGamefication.megabytes += reward.megabytes;
	}

	await Promise.all([
		GameficationLogRepository.insert(log),
		GameficationRepository.update(
			{
				userId: user.id,
			},
			updatedGamefication,
		),
	]);

	return {
		...userGamefication,
		...updatedGamefication,
	} as GameficationEntity;
};
