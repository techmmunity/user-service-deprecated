import { UserEntity } from "v1/api/user/user.entity";

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
