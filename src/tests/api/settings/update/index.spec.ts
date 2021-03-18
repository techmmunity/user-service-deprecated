import { v4 } from "uuid";

import { SettingsService } from "api/settings/settings.service";

import { LanguageValues } from "core/enums/language";
import { ThemeValues } from "core/enums/theme";

import { SettingsMock } from "tests/mocks/settings";

describe("SettingsService > update", () => {
	let service: SettingsService;

	const userId = v4();

	const languages = LanguageValues();

	const themes = ThemeValues();

	beforeAll(async () => {
		service = await SettingsMock.service();
	});

	beforeEach(() => {
		SettingsMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should update settings with valid params (with ALL languages)", async () => {
		const docs = languages.map(language =>
			SettingsMock.doc({
				userId,
				language,
			}),
		);

		docs.forEach(doc => SettingsMock.repository.save.mockReturnValueOnce(doc));

		const settings = await Promise.all(
			languages.map(language =>
				service.update({
					userId,
					language,
				}),
			),
		);

		expect(SettingsMock.repository.save).toBeCalledTimes(languages.length);
		expect(settings).toMatchObject(docs);
	});

	it("should update settings with valid params (with ALL themes)", async () => {
		const docs = themes.map(theme =>
			SettingsMock.doc({
				userId,
				theme,
			}),
		);

		docs.forEach(doc => SettingsMock.repository.save.mockReturnValueOnce(doc));

		const settings = await Promise.all(
			themes.map(theme =>
				service.update({
					userId,
					theme,
				}),
			),
		);

		expect(SettingsMock.repository.save).toBeCalledTimes(themes.length);
		expect(settings).toMatchObject(docs);
	});

	it("should update settings with valid params (with ALL languages and themes)", async () => {
		const docs = languages
			.map(language =>
				themes.map(theme =>
					SettingsMock.doc({
						userId,
						theme,
						language,
					}),
				),
			)
			.flat();

		docs.forEach(doc => SettingsMock.repository.save.mockReturnValueOnce(doc));

		const settings = await Promise.all(
			languages
				.map(language =>
					themes.map(theme =>
						service.update({
							userId,
							theme,
							language,
						}),
					),
				)
				.flat(),
		);

		const qtdCombinatios = themes.length * languages.length;

		expect(SettingsMock.repository.save).toBeCalledTimes(qtdCombinatios);
		expect(settings).toMatchObject(docs);
	});
});
