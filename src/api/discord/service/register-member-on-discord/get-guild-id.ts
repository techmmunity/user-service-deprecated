import {
	HeadlineEnum,
	isDesignerHeadline,
	isDeveloperHeadline,
	isEntrepreneurHeadline,
	isRoboticsHeadline,
} from "core/enums/headline";

import { GUILDS_IDS } from "config/discord";

export const getGuildId = (headline?: HeadlineEnum) => {
	switch (true) {
		case isDeveloperHeadline(headline):
			return GUILDS_IDS.DEVELOPER;
		case isDesignerHeadline(headline):
			return GUILDS_IDS.DESIGNER;
		case isRoboticsHeadline(headline):
			return GUILDS_IDS.ROBOTICS;
		case isEntrepreneurHeadline(headline):
			return GUILDS_IDS.ENTREPRENOUR;
		default:
			return undefined;
	}
};
