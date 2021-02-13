import { v4 } from "uuid";

import { SettingsService } from "api/settings/settings.service";

import { LanguageEnum } from "core/enums/language";

import { SettingsMock } from "tests/mocks/settings";

const userId = v4();

describe("SettingsService > create", () => {
	let service: SettingsService;

	beforeAll(async () => {
		service = await SettingsMock.service();
	});

	beforeEach(() => {
		SettingsMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create settings with valid params", async () => {
		const settingsDoc = SettingsMock.doc({
			userId,
		});

		SettingsMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.create({
			userId,
		});

		expect(SettingsMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});

	it("should create settings with valid params", async () => {
		const settingsDoc = SettingsMock.doc({
			userId,
			language: LanguageEnum.PT_BR,
		});

		SettingsMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.create({
			userId,
			language: LanguageEnum.PT_BR,
		});

		expect(SettingsMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});
});
