import { check } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { VerifyAccountMock } from "tests/mocks/verify-account";

const userId = v4();

describe("VerifyAccountService > create", () => {
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

	it("should create verifyAccount with valid params", async () => {
		const verifyAccount = await service.create(userId);

		expect(VerifyAccountMock.repository.insert).toBeCalledTimes(1);
		expect(typeof verifyAccount).toBe("string");
		expect(check.isUUIDv4(verifyAccount)).toBe(true);
	});
});
