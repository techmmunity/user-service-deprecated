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
});
