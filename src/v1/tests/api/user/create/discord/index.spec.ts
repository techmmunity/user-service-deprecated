import { v4, validate } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { TimeUtil } from "v1/utils/time";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

import { UserMock } from "v1/tests/mocks/user";
import { UserTokenMock } from "v1/tests/mocks/user-token";
import { VerifyAccountMock } from "v1/tests/mocks/verify-account";

describe("UserService > create > discord", () => {
	let service: UserService;

	const userId = v4();

	let validExpirationDate: Date;

	beforeAll(async () => {
		service = await UserMock.service();

		validExpirationDate = new Date(new Date().getTime() + TimeUtil.ONE_HOUR);
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
		UserTokenMock.repository.resetMock();
		VerifyAccountMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with mandatory valid params", async () => {
		const userBirthDay = new Date([2000, 4, 15]);

		const userDoc = UserMock.doc({
			userId,
			birthday: userBirthDay,
			email: "test@email.com",
			username: "test",
			name: "Test",
			surnames: "User User",
			headline: HeadlineEnum.BACK_END_DEV,
		});

		UserMock.repository.save.mockReturnValue(userDoc);

		let result;

		try {
			result = await service.createDiscord({
				email: "test@email.com",
				username: "test",
				fullName: "Test User User",
				birthday: userBirthDay,
				password: "$trongPass123",
				headline: HeadlineEnum.BACK_END_DEV,
				discordUserId: "example-discord-user-id",
				discordAccessToken: "example-access-token",
				discordRefreshToken: "example-refresh-token",
				discordTokenExpirationDate: validExpirationDate,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(UserTokenMock.repository.save).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.insert).toBeCalledTimes(1);
		expect(result).toMatchObject({
			user: {
				id: userId,
				username: "test",
				headline: HeadlineEnum.BACK_END_DEV,
			},
		});
		expect(typeof result.user.pin).toBe("string");
		expect(typeof parseInt(result.user.pin)).toBe("number");
		expect(Number.isNaN(parseInt(result.user.pin))).toBe(false);
		expect(typeof result.verificationCode).toBe("string");
		expect(validate(result.verificationCode)).toBe(true);
	});

	it("should create user with mandatory and optional valid params", async () => {
		const userBirthDay = new Date([2000, 4, 15]);

		const userDoc = UserMock.doc({
			userId,
			birthday: userBirthDay,
			email: "test@email.com",
			username: "test",
			name: "Test",
			surnames: "User User",
			headline: HeadlineEnum.BACK_END_DEV,
			avatar: "https://avatarurl.com",
		});

		UserMock.repository.save.mockReturnValue(userDoc);

		let result;

		try {
			result = await service.createDiscord({
				email: "test@email.com",
				username: "test",
				fullName: "Test User User",
				birthday: userBirthDay,
				password: "$trongPass123",
				headline: HeadlineEnum.BACK_END_DEV,
				suggestedLanguage: LanguageEnum.PT_BR,
				avatar: "https://avatarurl.com",
				discordUserId: "example-discord-user-id",
				discordAccessToken: "example-access-token",
				discordRefreshToken: "example-refresh-token",
				discordTokenExpirationDate: validExpirationDate,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(UserTokenMock.repository.save).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.insert).toBeCalledTimes(1);
		expect(result).toMatchObject({
			user: {
				id: userId,
				username: "test",
				avatar: "https://avatarurl.com",
				headline: HeadlineEnum.BACK_END_DEV,
			},
		});
		expect(typeof result.user.pin).toBe("string");
		expect(typeof parseInt(result.user.pin)).toBe("number");
		expect(Number.isNaN(parseInt(result.user.pin))).toBe(false);
		expect(typeof result.verificationCode).toBe("string");
		expect(validate(result.verificationCode)).toBe(true);
	});
});
