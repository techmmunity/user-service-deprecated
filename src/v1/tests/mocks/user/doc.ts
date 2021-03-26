import { UserType } from "v1/api/user/user.entity";

import { PinUtil } from "v1/utils/pin";

import { HeadlineEnum } from "core/enums/headline";

export interface CreateUserDoc {
	userId: string;
	email: string;
	username: string;
	name: string;
	surnames: string;
	headline: HeadlineEnum;
	birthday: Date;
	avatar?: string;
	verified?: boolean;
	discordUserId?: string;
	googleUserId?: string;
	githubUserId?: string;
	linkedinUserId?: string;
}

export const doc = ({
	userId,
	email,
	username,
	name,
	surnames,
	verified,
	headline,
	birthday,
	avatar,
	discordUserId,
	googleUserId,
	githubUserId,
	linkedinUserId,
}: CreateUserDoc) => {
	const date = new Date();

	const userDoc = {
		email,
		username,
		name,
		surnames,
		headline,
		birthday,
		createdAt: date,
		updatedAt: date,
		id: userId,
		verified: verified ? true : false,
		pin: PinUtil.gen(),
	} as Partial<UserType>;

	if (avatar) userDoc.avatar = avatar;
	if (discordUserId) userDoc.discordUserId = discordUserId;
	if (googleUserId) userDoc.googleUserId = googleUserId;
	if (githubUserId) userDoc.githubUserId = githubUserId;
	if (linkedinUserId) userDoc.linkedinUserId = linkedinUserId;

	return userDoc;
};
