import { validate } from "./validation";

import { TutorialRepository, TutorialType } from "api/tutorial/tutorial.entity";

interface Injectables {
	TutorialRepository: TutorialRepository;
}

export interface CompleteParams {
	userId: string;
	field: keyof Omit<TutorialType, "id">;
}

export const complete = async ({
	TutorialRepository,
	...params
}: CompleteParams & Injectables) => {
	await validate(params);

	const { userId, field } = params;

	await TutorialRepository.update(userId, {
		[field]: false,
	});

	return {
		ok: true,
	};
};
