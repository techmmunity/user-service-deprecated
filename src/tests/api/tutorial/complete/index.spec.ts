import { v4 } from "uuid";

import { TutorialService } from "api/tutorial/tutorial.service";

import { TutorialMock } from "tests/mocks/tutorial";

const userId = v4();

describe("TutorialService > complete", () => {
	let service: TutorialService;

	beforeAll(async () => {
		service = await TutorialMock.service();
	});

	beforeEach(() => {
		TutorialMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should complete tutorial with valid params (articlesListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "articlesListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (coursesListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "coursesListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (forumListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "forumListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (jobsListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "jobsListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (mentoringListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "mentoringListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (projectsListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "projectsListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (storeListPage)", async () => {
		const result = await service.complete({
			userId,
			field: "storeListPage",
		});

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});
});
