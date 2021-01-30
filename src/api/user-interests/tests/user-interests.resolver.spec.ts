import { Test, TestingModule } from "@nestjs/testing";

import { UserInterestsResolver } from "../user-interests.resolver";

describe("UserInterestsResolver", () => {
	let resolver: UserInterestsResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserInterestsResolver],
		}).compile();

		resolver = module.get<UserInterestsResolver>(UserInterestsResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
