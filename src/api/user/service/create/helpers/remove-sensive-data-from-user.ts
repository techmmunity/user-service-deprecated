import { UserEntity } from "api/user/user.entity";

export const removeSensiveDataFromUser = ({
	id,
	username,
	avatar,
	headline,
	permissions,
	pin,
}: UserEntity) => ({
	id,
	username,
	avatar,
	headline,
	permissions,
	pin,
});
