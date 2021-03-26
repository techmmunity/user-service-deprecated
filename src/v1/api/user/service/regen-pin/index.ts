import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";
import { PinUtil } from "v1/utils/pin";

interface Injectables {
	UserRepository: UserRepository;
}

export interface RegenPinParams {
	userId: string;
}

export const regenPin = async (
	{ UserRepository }: Injectables,
	params: RegenPinParams,
) => {
	await validate(params);

	const { userId } = params;

	const newPin = PinUtil.gen();

	const result = await UserRepository.update(userId, {
		pin: newPin,
	});

	if (result.affected !== 1) {
		return ErrorUtil.notFound(["user not found"]);
	}

	return newPin;
};
