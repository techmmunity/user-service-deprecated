import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

export interface GetSettingsDocsParams {
	userId: string;
	language?: LanguageEnum;
}

export const doc = ({ userId, language }: GetSettingsDocsParams) => ({
	userId,
	theme: ThemeEnum.DARK,
	language: language || LanguageEnum.EN,
});
