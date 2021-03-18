import { v4 } from "uuid";

import { UserTokenService } from "api/user-token/user-token.service";

import { TimeUtil } from "utils/time";

import { IntegrationsEnum } from "core/enums/integrations";

import { UserTokenMock } from "tests/mocks/user-token";

describe("UserTokenService > update", () => {
	let service: UserTokenService;

	const userId = v4();

	let expirationDate: Date;

	beforeAll(async () => {
		service = await UserTokenMock.service();

		const now = TimeUtil.newDate().getTime();

		expirationDate = TimeUtil.newDate(now + TimeUtil.ONE_HOUR);
	});

	beforeEach(() => {
		UserTokenMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should update UserToken with valid params", async () => {
		const userTokenDoc = UserTokenMock.doc({
			userId,
			expirationDate,
			accessToken: "foo_bar",
			refreshToken: "foo_bar",
		});

		UserTokenMock.repository.save.mockReturnValue(userTokenDoc);

		const UserToken = await service.update({
			userId,
			expirationDate,
			type: IntegrationsEnum.DISCORD,
			accessToken: "foo_bar",
			refreshToken: "foo_bar",
		});

		expect(UserTokenMock.repository.save).toBeCalledTimes(1);
		expect(UserToken).toMatchObject(userTokenDoc);
	});
});
