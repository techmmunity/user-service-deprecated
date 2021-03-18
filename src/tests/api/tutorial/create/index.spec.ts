import { v4 } from "uuid";

import { TutorialService } from "api/tutorial/tutorial.service";

import { TutorialMock } from "tests/mocks/tutorial";

describe("TutorialService > create", () => {
	let service: TutorialService;

	const userId = v4();

	beforeAll(async () => {
		service = await TutorialMock.service();
	});

	beforeEach(() => {
		TutorialMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create tutorial with valid params", async () => {
		const tutorialDoc = TutorialMock.doc({
			userId,
		});

		TutorialMock.repository.save.mockReturnValue(tutorialDoc);

		const tutorial = await service.create({
			userId,
		});

		expect(TutorialMock.repository.save).toBeCalledTimes(1);
		expect(tutorial).toMatchObject(tutorialDoc);
	});
});
