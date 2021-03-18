import { v4, validate } from "uuid";

import { UserService } from "api/user/user.service";

import { TimeUtil } from "utils/time";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

import { DEFAULT_USER_PERMISSIONS } from "config/default-user-permissions";

import { SettingsMock } from "tests/mocks/settings";
import { TutorialMock } from "tests/mocks/tutorial";
import { UserMock } from "tests/mocks/user";
import { UserTokenMock } from "tests/mocks/user-token";
import { VerifyAccountMock } from "tests/mocks/verify-account";

describe("UserService > create > local", () => {
	let service: UserService;

	const userId = v4();

	beforeAll(async () => {
		service = await UserMock.service();
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
		SettingsMock.repository.resetMock();
		TutorialMock.repository.resetMock();
		UserTokenMock.repository.resetMock();
		VerifyAccountMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with mandatory valid params", async () => {
		const userBirthDay = TimeUtil.newDate([2000, 4, 15]);

		const userDoc = UserMock.doc({
			userId,
			birthday: userBirthDay,
			email: "test@email.com",
			username: "test",
			name: "Test",
			surnames: "User User",
			headline: HeadlineEnum.BACK_END_DEV,
		});
		const settingsDoc = SettingsMock.doc({
			userId,
		});
		const tutorialDoc = TutorialMock.doc({
			userId,
		});

		UserMock.repository.save.mockReturnValue(userDoc);
		SettingsMock.repository.save.mockReturnValue(settingsDoc);
		TutorialMock.repository.save.mockReturnValue(tutorialDoc);

		let result;

		try {
			result = await service.createLocal({
				email: "test@email.com",
				username: "test",
				fullName: "Test User User",
				birthday: userBirthDay,
				password: "$trongPass123",
				headline: HeadlineEnum.BACK_END_DEV,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(TutorialMock.repository.save).toBeCalledTimes(1);
		expect(SettingsMock.repository.save).toBeCalledTimes(1);
		expect(UserTokenMock.repository.save).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.insert).toBeCalledTimes(1);
		expect(result).toMatchObject({
			settings: settingsDoc,
			tutorial: tutorialDoc,
			user: {
				id: userId,
				username: "test",
				headline: HeadlineEnum.BACK_END_DEV,
				permissions: DEFAULT_USER_PERMISSIONS,
			},
		});
		expect(typeof result.user.pin).toBe("string");
		expect(typeof parseInt(result.user.pin)).toBe("number");
		expect(Number.isNaN(parseInt(result.user.pin))).toBe(false);
		expect(typeof result.verificationCode).toBe("string");
		expect(validate(result.verificationCode)).toBe(true);
	});

	it("should create user with mandatory and optional valid params", async () => {
		const userBirthDay = TimeUtil.newDate([2000, 4, 15]);

		const userDoc = UserMock.doc({
			userId,
			birthday: userBirthDay,
			email: "test@email.com",
			username: "test",
			name: "Test",
			surnames: "User User",
			headline: HeadlineEnum.BACK_END_DEV,
			languages: [LanguageEnum.PT_BR],
			avatar: "https://avatarurl.com",
		});
		const settingsDoc = SettingsMock.doc({
			userId,
			language: LanguageEnum.PT_BR,
		});
		const tutorialDoc = TutorialMock.doc({
			userId,
		});

		UserMock.repository.save.mockReturnValue(userDoc);
		SettingsMock.repository.save.mockReturnValue(settingsDoc);
		TutorialMock.repository.save.mockReturnValue(tutorialDoc);

		let result;

		try {
			result = await service.createLocal({
				email: "test@email.com",
				username: "test",
				fullName: "Test User User",
				birthday: userBirthDay,
				password: "$trongPass123",
				headline: HeadlineEnum.BACK_END_DEV,
				suggestedLanguage: LanguageEnum.PT_BR,
				avatar: "https://avatarurl.com",
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(TutorialMock.repository.save).toBeCalledTimes(1);
		expect(SettingsMock.repository.save).toBeCalledTimes(1);
		expect(UserTokenMock.repository.save).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.insert).toBeCalledTimes(1);
		expect(result).toMatchObject({
			settings: settingsDoc,
			tutorial: tutorialDoc,
			user: {
				id: userId,
				username: "test",
				avatar: "https://avatarurl.com",
				headline: HeadlineEnum.BACK_END_DEV,
				permissions: DEFAULT_USER_PERMISSIONS,
			},
		});
		expect(typeof result.user.pin).toBe("string");
		expect(typeof parseInt(result.user.pin)).toBe("number");
		expect(Number.isNaN(parseInt(result.user.pin))).toBe(false);
		expect(typeof result.verificationCode).toBe("string");
		expect(validate(result.verificationCode)).toBe(true);
	});
});
