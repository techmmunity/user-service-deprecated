import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

import { errorUtil } from "v1/utils/error";
import { pinUtil } from "v1/utils/pin";

interface Injectables {
	userRepository: UserRepository;
}

export interface RegenPinParams {
	userId: string;
}

export const regenPin = async (
	{ userRepository }: Injectables,
	params: RegenPinParams,
) => {
	await validate(params);

	const { userId } = params;

	const newPin = pinUtil.gen();

	const result = await userRepository.update(userId, {
		pin: newPin,
	});

	if (result.affected !== 1) {
		return errorUtil.notFound([`User with ID "${userId}" doesn't exist`]);
	}

	return {
		newPin,
	};
};
