import { Test, TestingModule } from "@nestjs/testing";

import { DiscordResolver } from "../discord.resolver";

describe("DiscordResolver", () => {
	let resolver: DiscordResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DiscordResolver],
		}).compile();

		resolver = module.get<DiscordResolver>(DiscordResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
