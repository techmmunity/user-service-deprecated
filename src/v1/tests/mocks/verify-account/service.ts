import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";
import { SettingsMock } from "../settings";
import { TutorialMock } from "../tutorial";
import { UserMock } from "../user";
import { UserTokenMock } from "../user-token";

import { SettingsService } from "v1/api/settings/settings.service";
import { TutorialService } from "v1/api/tutorial/tutorial.service";
import { UserTokenService } from "v1/api/user-token/user-token.service";
import { UserService } from "v1/api/user/user.service";
import { VerifyAccountService } from "v1/api/verify-account/verify-account.service";

import { SettingsEntity } from "v1/api/settings/settings.entity";
import { TutorialEntity } from "v1/api/tutorial/tutorial.entity";
import { UserTokenEntity } from "v1/api/user-token/user-token.entity";
import { UserEntity } from "v1/api/user/user.entity";
import { VerifyAccountEntity } from "v1/api/verify-account/verify-account.entity";

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
				useValue: UserMock.repository,
			},
			{
				provide: getRepositoryToken(SettingsEntity),
				useValue: SettingsMock.repository,
			},
			{
				provide: getRepositoryToken(TutorialEntity),
				useValue: TutorialMock.repository,
			},
			{
				provide: getRepositoryToken(UserTokenEntity),
				useValue: UserTokenMock.repository,
			},
		],
	}).compile();

	return module.get<VerifyAccountService>(VerifyAccountService);
};
