import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { ConfirmationTokenService } from "v1/api/confirmation-token/confirmation-token.service";

import { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ConfirmationTokenService,
			{
				provide: getRepositoryToken(ConfirmationTokenEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<ConfirmationTokenService>(ConfirmationTokenService);
};
