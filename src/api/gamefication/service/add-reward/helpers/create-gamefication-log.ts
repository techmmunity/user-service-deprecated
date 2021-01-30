import { Reward } from "../rewards";

import {
	GameficationLogRepository,
	GameficationLogType,
} from "api/gamefication-log/gamefication-log.entity";

import { GameficationLogEnum } from "types/enums/gamefication-log";

import { Token } from "types/token";

interface CreateGameficationLogParams {
	GameficationLogRepository: GameficationLogRepository;
	user: Token;
	reason: GameficationLogEnum;
	reward: Reward;
	levelUps: number;
}

export const createGameficationLog = ({
	GameficationLogRepository,
	user,
	reason,
	reward,
	levelUps,
}: CreateGameficationLogParams) => {
	const log: GameficationLogType = {
		reason,
		userId: user.id,
	};

	if (levelUps) log.levelUps = levelUps;
	if (reward.xp) log.xp = reward.xp;
	if (reward.bytes) log.bytes = reward.bytes;
	if (reward.megabytes) log.megabytes = reward.megabytes;

	return GameficationLogRepository.insert(log);
};
