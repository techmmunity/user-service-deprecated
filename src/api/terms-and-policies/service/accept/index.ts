import { validate } from "./validation";

import { TermsAndPoliciesRepository } from "api/terms-and-policies/terms-and-policies.entity";

interface Injectables {
	TermsAndPoliciesRepository: TermsAndPoliciesRepository;
}

export interface AcceptParams {
	userId: string;
	version: number;
}

export const accept = async ({
	TermsAndPoliciesRepository,
	...params
}: AcceptParams & Injectables) => {
	await validate(params);

	const { userId, version } = params;

	return TermsAndPoliciesRepository.save({
		userId,
		version,
	});
};
