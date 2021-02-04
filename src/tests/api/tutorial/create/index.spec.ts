import { TutorialMock } from "tests/mocks/tutorial";

import { TutorialService } from "api/tutorial/tutorial.service";

describe("TutorialService > create", () => {
	let service: TutorialService;

	beforeAll(async () => {
		service = await TutorialMock.service();
	});

	beforeEach(() => {
		TutorialMock.repository.save.mockReset();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create tutorial with valid params", async () => {
		const tutorialDoc = TutorialMock.doc({
			userId: "123",
		});

		TutorialMock.repository.save.mockReturnValue(tutorialDoc);

		const tutorial = await service.create({
			userId: "123",
		});

		expect(TutorialMock.repository.save).toBeCalledTimes(1);
		expect(tutorial).toMatchObject(tutorialDoc);
	});
});
