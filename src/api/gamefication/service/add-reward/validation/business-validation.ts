import { ErrorUtil } from "utils/error";

import { GameficationLogEnum } from "types/enums/gamefication-log";

export const businessValidation = (reason: GameficationLogEnum) => {
	if (!GameficationLogEnum[reason]) {
		ErrorUtil.badRequest("INVALID_REASON");
	}
};
