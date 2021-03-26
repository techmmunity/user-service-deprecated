import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { HeadlineEnum } from "core/enums/headline";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > find-by-id", () => {
	let service: UserService;

	const userId = v4();

	beforeAll(async () => {
		service = await UserMock.service();
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should find user with valid params", async () => {
		const doc = UserMock.doc({
			userId,
			email: "test@email.com",
			username: "test",
			name: "Example",
			surnames: "Name",
			headline: HeadlineEnum.ANIMATOR,
			birthday: new Date(),
		});

		UserMock.repository.findOne.mockReturnValue(doc);

		let result;

		try {
			result = await service.findById({
				userId,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toMatchObject(doc);
	});

	it("should throw error when user not found", async () => {
		UserMock.repository.findOne.mockReturnValue(undefined);

		let result;

		try {
			result = await service.findById({
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			code: "NOT_FOUND",
			statusCode: 404,
			errors: ["user not found"],
		});
	});
});
