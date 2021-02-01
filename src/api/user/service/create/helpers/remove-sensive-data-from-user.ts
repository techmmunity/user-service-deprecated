import { UserEntity } from "api/user/user.entity";

export const removeSensiveDataFromUser = ({
	_id,
	username,
	avatar,
	headline,
	permissions,
}: UserEntity) => ({
	id: _id.toHexString(),
	username,
	avatar,
	headline,
	permissions,
});
