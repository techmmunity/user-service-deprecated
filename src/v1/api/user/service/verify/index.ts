import { validate } from "./validation";

import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";

export interface Injectables {
	UserRepository: UserRepository;
}

export interface VerifyParams {
	userId: string;
}

const getRowsUpdated = (raw: string) => raw.replace("UPDATE ", "");

export const verify = async ({
	UserRepository,
	userId,
}: VerifyParams & Injectables) => {
	await validate({ userId });

	const result = await UserRepository.update(userId, {
		verified: true,
	});

	const updatedRows = getRowsUpdated(result.raw);

	if (updatedRows !== "1") {
		return ErrorUtil.notFound("NOT_FOUND", ["user not found"]);
	}
};
