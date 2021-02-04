import { ServiceMock } from "tests/mocks/settings";

import { SettingsService } from "api/settings/settings.service";

import { LanguageEnum } from "core/enums/language";

describe("SettingsService > create", () => {
	let service: SettingsService;

	beforeAll(async () => {
		service = await ServiceMock.service();
	});

	beforeEach(() => {
		ServiceMock.repository.save.mockReset();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create settings with valid params", async () => {
		const settingsDoc = ServiceMock.doc({
			userId: "123",
		});

		ServiceMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.create({
			userId: "123",
		});

		expect(ServiceMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});

	it("should create settings with valid params", async () => {
		const settingsDoc = ServiceMock.doc({
			userId: "123",
			language: LanguageEnum.PT_BR,
		});

		ServiceMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.create({
			userId: "123",
			language: LanguageEnum.PT_BR,
		});

		expect(ServiceMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});
});
