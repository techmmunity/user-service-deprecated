import { v4 } from "uuid";

import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { UserMock } from "tests/mocks/user";
import { VerifyAccountMock } from "tests/mocks/verify-account";

describe("VerifyAccountService > verify", () => {
	let service: VerifyAccountService;

	const userId = v4();

	beforeAll(async () => {
		service = await VerifyAccountMock.service();
	});

	beforeEach(() => {
		VerifyAccountMock.repository.resetMock();
		UserMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should verify account with valid params", async () => {
		const confirmationCode = v4();

		VerifyAccountMock.repository.findOne.mockReturnValue({
			id: userId,
			confirmationCode,
		});

		let result;

		try {
			result = await service.verify(confirmationCode);
		} catch (err) {
			result = err;
		}

		expect(VerifyAccountMock.repository.findOne).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.update).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should throw error if account not found", async () => {
		const confirmationCode = v4();

		VerifyAccountMock.repository.findOne.mockReturnValue(undefined);

		let result;

		try {
			result = await service.verify(confirmationCode);
		} catch (err) {
			result = err;
		}

		expect(VerifyAccountMock.repository.findOne).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.update).toBeCalledTimes(0);
		expect(UserMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			code: "CONFIRMATION_CODE_NOT_FOUND",
			statusCode: 404,
			errors: [],
		});
	});
});
