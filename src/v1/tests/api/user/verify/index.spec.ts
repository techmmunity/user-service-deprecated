import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { PinUtil } from "v1/utils/pin";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > verify", () => {
	let service: UserService;

	const userId = v4();
	const verificationCode = PinUtil.gen();

	beforeAll(async () => {
		service = await UserMock.service();
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should verify user with valid params", async () => {
		UserMock.repository.update.mockReturnValue({
			affected: 1,
		});

		const result = await service.verify({
			userId,
			verificationCode,
		});

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(UserMock.repository.find).toBeCalledTimes(0);
		expect(result).toBeUndefined();
	});

	it("should throw error if user not exists or invalid pin", async () => {
		UserMock.repository.update.mockReturnValue({
			affected: 0,
		});

		let result;

		try {
			result = await service.verify({
				userId,
				verificationCode,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["Invalid userId or verificationCode"],
		});
	});
});
