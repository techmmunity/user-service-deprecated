import { LanguageEnum } from "core/enums/language";

import { ErrorUtil } from "utils/error";

import { CreateParams } from "..";

export const businessValidation = ({ language }: CreateParams) => {
	if (language && !LanguageEnum[language]) {
		ErrorUtil.badRequest("INVALID_LANGUAGE");
	}
};
