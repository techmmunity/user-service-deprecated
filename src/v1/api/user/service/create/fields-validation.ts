import { yup } from "v1/utils/yup";

import { HeadlineValues } from "core/enums/headline";
import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

export const email = yup.string().required().strict().email();

export const username = yup
	.string()
	.required()
	.strict()
	.min(Limits.user.username.min)
	.max(Limits.user.username.max)
	.username();

export const birthday = yup.date().required().strict().max(new Date());

export const fullName = yup
	.string()
	.required()
	.strict()
	.max(Limits.user.fullName.max)
	.fullName();

export const avatar = yup
	.string()
	.notRequired()
	.strict()
	.max(Limits.user.avatar.max)
	.url();

export const suggestedLanguage = yup
	.string()
	.notRequired()
	.strict()
	.oneOf(LanguageValues());

export const headline = yup
	.string()
	.required()
	.strict()
	.oneOf(HeadlineValues());

export const youtube = yup
	.string()
	.required()
	.strict()
	.max(Limits.user.youtube.max);
