import { Test, TestingModule } from "@nestjs/testing";

import { VerifyAccountService } from "../verify-account.service";

describe("VerifyAccountService", () => {
	let service: VerifyAccountService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VerifyAccountService],
		}).compile();

		service = module.get<VerifyAccountService>(VerifyAccountService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
