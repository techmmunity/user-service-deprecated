import { ServiceMock } from "tests/mocks/settings";
import { v4 } from "uuid";

import { SettingsService } from "api/settings/settings.service";

import { LanguageEnum } from "core/enums/language";

const userId = v4();

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
			userId,
		});

		ServiceMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.create({
			userId,
		});

		expect(ServiceMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});

	it("should create settings with valid params", async () => {
		const settingsDoc = ServiceMock.doc({
			userId,
			language: LanguageEnum.PT_BR,
		});

		ServiceMock.repository.save.mockReturnValue(settingsDoc);

		const settings = await service.create({
			userId,
			language: LanguageEnum.PT_BR,
		});

		expect(ServiceMock.repository.save).toBeCalledTimes(1);
		expect(settings).toMatchObject(settingsDoc);
	});
});
