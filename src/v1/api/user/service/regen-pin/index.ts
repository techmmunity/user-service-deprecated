import { generatePIN } from "../helpers/generate-pin";

import { validate } from "./validation";

import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";

interface Injectables {
	UserRepository: UserRepository;
}

export interface RegenPinParams {
	userId: string;
}

const getUpdatedRows = (raw: string) => raw.replace("UPDATE ", "");

export const regenPin = async ({
	UserRepository,
	...params
}: RegenPinParams & Injectables) => {
	await validate(params);

	const { userId } = params;

	const newPin = generatePIN();

	const result = await UserRepository.update(
		{
			id: userId,
		},
		{
			pin: newPin,
		},
	);

	const updatedRows = getUpdatedRows(result.raw);

	if (updatedRows !== "1") {
		return ErrorUtil.notFound("NOT_FOUND", ["user not found"]);
	}

	return newPin;
};
