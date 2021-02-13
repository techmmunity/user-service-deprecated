import { v4 } from "uuid";

import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { UserMock } from "tests/mocks/user";
import { VerifyAccountMock } from "tests/mocks/verify-account";

const userId = v4();

describe("VerifyAccountService > verify", () => {
	let service: VerifyAccountService;

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

		const result = await service.verify(confirmationCode);

		expect(VerifyAccountMock.repository.findOne).toBeCalledTimes(1);
		expect(VerifyAccountMock.repository.update).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});
});
