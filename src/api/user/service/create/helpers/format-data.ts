import { UserType } from "api/user/user.entity";

import { TimeUtil } from "utils/time";

import { PermissionsEnum } from "core/enums/permissions";

import { CreateUser } from "api/user/service/create/types";

export const formatData = async (params: CreateUser) => {
	const { email, username, avatar, headline, birthday, fullName } = params;

	const user: Partial<UserType> = {
		email,
		username,
		verified: false,
		permissions: [
			PermissionsEnum.ARTICLE_LIKE,
			PermissionsEnum.ARTICLE_COMMENT_CREATE,
			PermissionsEnum.ARTICLE_COMMENT_UPDATE_OWN,
			PermissionsEnum.ARTICLE_COMMENT_DELETE_OWN,
			PermissionsEnum.COURSE_RATE,
			PermissionsEnum.COURSE_COMMENT_CREATE,
			PermissionsEnum.COURSE_COMMENT_UPDATE_OWN,
			PermissionsEnum.COURSE_COMMENT_DELETE_OWN,
			PermissionsEnum.FORUM_QUESTION_LIKE,
			PermissionsEnum.FORUM_QUESTION_CREATE,
			PermissionsEnum.FORUM_QUESTION_UPDATE_OWN,
			PermissionsEnum.FORUM_QUESTION_DELETE_OWN,
			PermissionsEnum.FORUM_ANSWER_LIKE,
			PermissionsEnum.CERTIFICATION_BUY,
			PermissionsEnum.PROJECT_APPLY,
			PermissionsEnum.MENTOR_ADD,
		],
	};

	if (avatar) {
		user.avatar = avatar;
	}
	if (headline) {
		user.headline = headline;
	}
	if (birthday) {
		user.birthday = TimeUtil.unformat(birthday);
	}

	switch (params.strategy) {
		case "DISCORD":
			const [name, ...surnames] = fullName.split(" ");

			user.name = name;
			user.surnames = surnames.join(" ");
			user.discordUserId = params.discordUserId;
			user.verified = true;
	}

	return user as UserType;
};
