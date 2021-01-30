import { Test, TestingModule } from "@nestjs/testing";

import { VerifyAccountResolver } from "../verify-account.resolver";

describe("VerifyAccountResolver", () => {
	let resolver: VerifyAccountResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VerifyAccountResolver],
		}).compile();

		resolver = module.get<VerifyAccountResolver>(VerifyAccountResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
