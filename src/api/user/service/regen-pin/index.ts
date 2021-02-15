import { generatePIN } from "../helpers/generate-pin";

import { validate } from "./validation";

import { UserRepository } from "api/user/user.entity";

interface Injectables {
	UserRepository: UserRepository;
}

export interface RegenPinParams {
	userId: string;
}

export const regenPin = async ({
	UserRepository,
	...params
}: RegenPinParams & Injectables) => {
	await validate(params);

	const { userId } = params;

	const newPin = generatePIN();

	await UserRepository.update(
		{
			id: userId,
		},
		{
			pin: newPin,
		},
	);

	return newPin;
};
