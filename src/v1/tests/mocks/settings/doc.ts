import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

export interface GetSettingsDocsParams {
	userId: string;
	language?: LanguageEnum;
	theme?: ThemeEnum;
}

export const doc = ({ userId, language, theme }: GetSettingsDocsParams) => ({
	userId,
	theme: theme || ThemeEnum.DARK,
	language: language || LanguageEnum.EN,
});
