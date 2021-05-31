import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { confirmationTokenMock } from "../confirmation-token";
import { MockRepository } from "../repository";

import { DiscordService } from "v1/api/discord/discord.service";

import { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";
import { DiscordEntity } from "v1/api/discord/discord.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			DiscordService,
			{
				provide: getRepositoryToken(DiscordEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(ConfirmationTokenEntity),
				useValue: confirmationTokenMock.repository,
			},
		],
	}).compile();

	return module.get<DiscordService>(DiscordService);
};
