import { generatePIN } from "../helpers/generate-pin";

import { validate } from "./validation";

import { UserRepository } from "api/user/user.entity";

import { ErrorUtil } from "utils/error";

interface Injectables {
	UserRepository: UserRepository;
}

export interface RegenPinParams {
	userId: string;
}

const getRowsUpdated = (raw: string) => parseInt(raw.replace("UPDATE ", ""));

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

	const updatedRows = getRowsUpdated(result.raw);

	if (updatedRows < 1) {
		return ErrorUtil.notFound("USER_NOT_FOUND");
	}

	return newPin;
};
