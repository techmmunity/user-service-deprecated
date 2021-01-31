import { Test, TestingModule } from "@nestjs/testing";

import { VerifyAccountController } from "../verify-account.controller";

describe("VerifyAccountController", () => {
	let controller: VerifyAccountController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VerifyAccountController],
		}).compile();

		controller = module.get<VerifyAccountController>(VerifyAccountController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
