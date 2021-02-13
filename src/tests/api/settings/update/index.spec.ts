import { v4 } from "uuid";

import { SettingsService } from "api/settings/settings.service";

import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

import { SettingsMock } from "tests/mocks/settings";

const userId = v4();

describe("SettingsService > update", () => {
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

	it("should update settings with valid params", async () => {
		const settingsDoc = SettingsMock.doc({
			userId,
			language: LanguageEnum.PT_BR,
		});

		SettingsMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.update({
			userId,
			language: LanguageEnum.PT_BR,
		});

		expect(SettingsMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});

	it("should update settings with valid params", async () => {
		const settingsDoc = SettingsMock.doc({
			userId,
			theme: ThemeEnum.LIGHT,
		});

		SettingsMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.update({
			userId,
			theme: ThemeEnum.LIGHT,
		});

		expect(SettingsMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});
});
