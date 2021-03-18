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
		let result;

		try {
			result = await service.complete({
				userId,
				field: "articlesListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (coursesListPage)", async () => {
		let result;

		try {
			result = await service.complete({
				userId,
				field: "coursesListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (forumListPage)", async () => {
		let result;

		try {
			result = await service.complete({
				userId,
				field: "forumListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (jobsListPage)", async () => {
		let result;

		try {
			result = await service.complete({
				userId,
				field: "jobsListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (mentoringListPage)", async () => {
		let result;

		try {
			result = await service.complete({
				userId,
				field: "mentoringListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (projectsListPage)", async () => {
		let result;

		try {
			result = await service.complete({
				userId,
				field: "projectsListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});

	it("should complete tutorial with valid params (storeListPage)", async () => {
		let result;

		try {
			result = await service.complete({
				userId,
				field: "storeListPage",
			});
		} catch (err) {
			result = err;
		}

		expect(TutorialMock.repository.update).toBeCalledTimes(1);
		expect(result).toMatchObject({ ok: true });
	});
});
