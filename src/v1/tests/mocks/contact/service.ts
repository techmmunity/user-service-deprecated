import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { ContactService } from "v1/api/contact/contact.service";

import { ContactEntity } from "v1/api/contact/contact.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			ContactService,
			{
				provide: getRepositoryToken(ContactEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<ContactService>(ContactService);
};
