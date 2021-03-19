import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { TermsAndPoliciesService } from "v1/api/terms-and-policies/terms-and-policies.service";

import { TermsAndPoliciesEntity } from "v1/api/terms-and-policies/terms-and-policies.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			TermsAndPoliciesService,
			{
				provide: getRepositoryToken(TermsAndPoliciesEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<TermsAndPoliciesService>(TermsAndPoliciesService);
};
