import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > verify", () => {
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
		UserMock.repository.update.mockReturnValue({
			raw: "UPDATE 1",
		});

		let result;

		try {
			result = await service.verify({
				userId,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result).toBeUndefined();
	});

	it("should throw error when user not found", async () => {
		UserMock.repository.update.mockReturnValue({
			raw: "UPDATE 0",
		});

		let result;

		try {
			result = await service.verify({
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			code: "NOT_FOUND",
			statusCode: 404,
			errors: ["user not found"],
		});
	});
});
