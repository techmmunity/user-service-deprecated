import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { confirmationTokenMock } from "../confirmation-token";
import { contactMock } from "../contact";
import { MockRepository } from "../repository";

import { UserService } from "v1/api/user/user.service";

import { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";
import { ContactEntity } from "v1/api/contact/contact.entity";
import { UserEntity } from "v1/api/user/user.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			UserService,
			{
				provide: getRepositoryToken(UserEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(ContactEntity),
				useValue: contactMock.repository,
			},
			{
				provide: getRepositoryToken(ConfirmationTokenEntity),
				useValue: confirmationTokenMock.repository,
			},
		],
	}).compile();

	return module.get<UserService>(UserService);
};
