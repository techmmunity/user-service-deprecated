import { v4 } from "uuid";

import { SettingsService } from "api/settings/settings.service";

import { LanguageValues } from "core/enums/language";

import { SettingsMock } from "tests/mocks/settings";

describe("SettingsService > create", () => {
	let service: SettingsService;

	const userId = v4();

	const languages = LanguageValues();

	beforeAll(async () => {
		service = await SettingsMock.service();
	});

	beforeEach(() => {
		SettingsMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create settings with valid params (without languages or themes)", async () => {
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

	it("should create settings with valid params (with ALL languages)", async () => {
		const docs = languages.map(language =>
			SettingsMock.doc({
				userId,
				language,
			}),
		);

		docs.forEach(doc => SettingsMock.repository.save.mockReturnValueOnce(doc));

		const settings = await Promise.all(
			languages.map(language =>
				service.create({
					userId,
					language,
				}),
			),
		);

		expect(SettingsMock.repository.save).toBeCalledTimes(languages.length);
		expect(settings).toMatchObject(docs);
	});
});
