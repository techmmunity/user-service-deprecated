import { PermissionsEnum } from "core/enums/permissions";

export const DEFAULT_USER_PERMISSIONS = [
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
];
