import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";
import { UserService } from "api/user/user.service";
import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { SettingsEntity } from "api/settings/settings.entity";
import { TutorialEntity } from "api/tutorial/tutorial.entity";
import { UserTokenEntity } from "api/user-token/user-token.entity";
import { UserEntity } from "api/user/user.entity";
import { VerifyAccountEntity } from "api/verify-account/verify-account.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			VerifyAccountService,
			UserService,
			SettingsService,
			TutorialService,
			UserTokenService,
			{
				provide: getRepositoryToken(VerifyAccountEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(UserEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(SettingsEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(TutorialEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(UserTokenEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<VerifyAccountService>(VerifyAccountService);
};
