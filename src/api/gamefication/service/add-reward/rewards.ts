import { ErrorUtil } from "utils/error";

import { GameficationLogEnum } from "types/enums/gamefication-log";

export interface Reward {
	xp?: number;
	bytes?: number;
	megabytes?: number;
}

const REWARDS: { [key in GameficationLogEnum]: Reward } = {
	[GameficationLogEnum.ANWSER_ARTICLE_QUESTION]: {
		xp: 120,
		bytes: 50,
	},
	[GameficationLogEnum.BUMP_DISCORD_SERVER]: {
		bytes: 700,
	},
	[GameficationLogEnum.PURCHASE]: {},
	[GameficationLogEnum.CUSTOM]: {},
};

export const getReward = (reason: string, options?: Reward): Reward => {
	const reward = REWARDS[reason];

	if (!reward) {
		ErrorUtil.badRequest("INVALID_REASON");
	}

	switch (reason) {
		case GameficationLogEnum.PURCHASE:
			reward.megabytes = options.megabytes;
			return reward;
		case GameficationLogEnum.CUSTOM:
			return options;
		default:
			return reward;
	}
};
