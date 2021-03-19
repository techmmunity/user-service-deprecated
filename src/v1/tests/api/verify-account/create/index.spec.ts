import { check } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { VerifyAccountService } from "v1/api/verify-account/verify-account.service";

import { VerifyAccountMock } from "v1/tests/mocks/verify-account";

describe("VerifyAccountService > create", () => {
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

	it("should create verifyAccount with valid params", async () => {
		const verifyAccount = await service.create(userId);

		expect(VerifyAccountMock.repository.insert).toBeCalledTimes(1);
		expect(typeof verifyAccount).toBe("string");
		expect(check.isUUIDv4(verifyAccount)).toBe(true);
	});
});
