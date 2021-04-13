import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { Limits } from "v1/config/limits";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > regen-pin", () => {
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

	it("should regen user PIN with valid params", async () => {
		UserMock.repository.update.mockReturnValue({
			affected: 1,
		});

		const result = await service.regenPin({
			userId,
		});

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(UserMock.repository.find).toBeCalledTimes(0);
		expect(typeof result.newPin).toBe("string");
		expect(result.newPin.length).toBe(Limits.user.pin.length);
	});

	it("should throw error if user not exists", async () => {
		UserMock.repository.update.mockReturnValue({
			affected: 0,
		});

		let result;

		try {
			result = await service.regenPin({
				userId,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			errors: [`User with ID "${userId}" doesn't exist`],
		});
	});
});
