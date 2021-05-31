import { yup } from "v1/utils/yup";

import { HeadlineValues } from "core/enums/headline";

import { LIMITS } from "v1/config/limits";

export const email = yup.string().required().strict().email();

export const username = yup
	.string()
	.required()
	.strict()
	.min(LIMITS.user.username.min)
	.max(LIMITS.user.username.max)
	.username();

export const birthday = yup.date().required().strict().max(new Date());

export const fullName = yup
	.string()
	.required()
	.strict()
	.max(LIMITS.user.fullName.max)
	.fullName();

export const avatar = yup
	.string()
	.notRequired()
	.strict()
	.max(LIMITS.user.avatar.max)
	.url();

export const headline = yup
	.string()
	.required()
	.strict()
	.oneOf(HeadlineValues());

export const youtube = yup
	.string()
	.required()
	.strict()
	.max(LIMITS.user.youtube.max);
