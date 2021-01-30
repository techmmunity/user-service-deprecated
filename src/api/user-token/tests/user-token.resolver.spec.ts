import { Test, TestingModule } from "@nestjs/testing";

import { UserTokenResolver } from "../user-token.resolver";

describe("UserTokenResolver", () => {
	let resolver: UserTokenResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserTokenResolver],
		}).compile();

		resolver = module.get<UserTokenResolver>(UserTokenResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
