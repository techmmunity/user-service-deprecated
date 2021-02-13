import { validate } from "./validation";

import { TermsAndPoliciesRepository } from "api/terms-and-policies/terms-and-policies.entity";

interface Injectables {
	TermsAndPoliciesRepository: TermsAndPoliciesRepository;
}

export interface HasAcceptedParams {
	userId: string;
	version: number;
}

export const hasAccepted = async ({
	TermsAndPoliciesRepository,
	...params
}: HasAcceptedParams & Injectables) => {
	await validate(params);

	const { userId, version } = params;

	return TermsAndPoliciesRepository.findOne({
		userId,
		version,
	});
};
