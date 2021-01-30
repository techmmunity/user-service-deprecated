import { Test, TestingModule } from "@nestjs/testing";

import { UserInterestsService } from "../user-interests.service";

describe("UserInterestsService", () => {
	let service: UserInterestsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserInterestsService],
		}).compile();

		service = module.get<UserInterestsService>(UserInterestsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
