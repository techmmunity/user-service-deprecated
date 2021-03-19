import { v4 } from "uuid";

import { duplicatedValidation } from "v1/api/user/service/create/validation-duplicated";

import { TimeUtil } from "v1/utils/time";

import { HeadlineEnum } from "core/enums/headline";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > create > validation-duplicated", () => {
	const userId = v4();

	it("should do nothing if user doesn't exists", async () => {
		UserMock.repository.findOne.mockReturnValue(undefined);

		let result;

		try {
			await duplicatedValidation({
				UserRepository: UserMock.repository as any,
				email: "test@email.com",
				username: "test",
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing if user doesn't exists (with extra conditions)", async () => {
		UserMock.repository.findOne.mockReturnValue(undefined);

		let result;

		try {
			await duplicatedValidation({
				UserRepository: UserMock.repository as any,
				email: "test@email.com",
				username: "test",
				extraConditions: {
					discordUserId: "example-discord-user-id",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error if user exists", async () => {
		const userDoc = UserMock.doc({
			userId,
			email: "test@email.com",
			username: "test",
			name: "Example",
			surnames: "Name",
			headline: HeadlineEnum.ANIMATOR,
			birthday: TimeUtil.newDate(),
		});

		UserMock.repository.findOne.mockReturnValue(userDoc);

		let result;

		try {
			await duplicatedValidation({
				UserRepository: UserMock.repository as any,
				email: "test@email.com",
				username: "test",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(409);
		expect(result.response).toMatchObject({
			code: "DUPLICATED_USER",
			statusCode: 409,
			errors: [],
		});
	});

	it("should throw an error if user exists (with extra params)", async () => {
		const userDoc = UserMock.doc({
			userId,
			email: "test@email.com",
			username: "test",
			name: "Example",
			surnames: "Name",
			headline: HeadlineEnum.ANIMATOR,
			birthday: TimeUtil.newDate(),
			discordUserId: "example-discord-user-id",
		});

		UserMock.repository.findOne.mockReturnValue(userDoc);

		let result;

		try {
			await duplicatedValidation({
				UserRepository: UserMock.repository as any,
				email: "test@email.com",
				username: "test",
				extraConditions: {
					discordUserId: "example-discord-user-id",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(409);
		expect(result.response).toMatchObject({
			code: "DUPLICATED_USER",
			statusCode: 409,
			errors: [],
		});
	});
});
