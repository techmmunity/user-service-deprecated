import { v4 } from "uuid";

import { UserService } from "api/user/user.service";

import { UserMock } from "tests/mocks/user";

const userId = v4();

describe("UserService > regen-pin", () => {
	let service: UserService;

	beforeAll(async () => {
		service = await UserMock.service();
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should regen pin user with valid params", async () => {
		UserMock.repository.update.mockReturnValue({
			raw: "UPDATE 1",
		});

		const result = await service.regenPin({
			userId,
		});

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(typeof result).toBe("string");
		expect(typeof parseInt(result)).toBe("number");
		expect(Number.isNaN(parseInt(result))).toBe(false);
	});

	it("should throw error when user not found", async () => {
		UserMock.repository.update.mockReturnValue({
			raw: "UPDATE 0",
		});

		let result;

		try {
			result = await service.regenPin({
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			code: "USER_NOT_FOUND",
			statusCode: 404,
			errors: [],
		});
	});
});
