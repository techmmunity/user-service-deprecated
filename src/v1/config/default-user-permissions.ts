import { PermissionsEnum } from "core/enums/permissions";

export const DEFAULT_USER_PERMISSIONS = [
	PermissionsEnum["article.like"],
	PermissionsEnum["article.comment.create"],
	PermissionsEnum["article.comment.update.own"],
	PermissionsEnum["article.comment.delete.own"],
	PermissionsEnum["course.rate"],
	PermissionsEnum["course.comment.create"],
	PermissionsEnum["course.comment.update.own"],
	PermissionsEnum["course.comment.delete.own"],
	PermissionsEnum["forum.question.like"],
	PermissionsEnum["forum.question.create"],
	PermissionsEnum["forum.question.update.own"],
	PermissionsEnum["forum.question.delete.own"],
	PermissionsEnum["forum.answer.like"],
	PermissionsEnum["certification.course.buy"],
	PermissionsEnum["project.apply"],
	PermissionsEnum["mentor.add"],
];
