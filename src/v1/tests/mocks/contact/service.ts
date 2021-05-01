import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { ConfirmationTokenMock } from "../confirmation-token";
import { MockRepository } from "../repository";

import { ContactService } from "v1/api/contact/contact.service";

import { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";
import { ContactEntity } from "v1/api/contact/contact.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ContactService,
			{
				provide: getRepositoryToken(ContactEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(ConfirmationTokenEntity),
				useValue: ConfirmationTokenMock.repository,
			},
		],
	}).compile();

	return module.get<ContactService>(ContactService);
};
