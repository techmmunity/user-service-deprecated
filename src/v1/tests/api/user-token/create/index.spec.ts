import { v4 } from "uuid";

import { UserTokenService } from "v1/api/user-token/user-token.service";

import { TimeUtil } from "v1/utils/time";

import { IntegrationsValues } from "core/enums/integrations";

import { UserTokenMock } from "v1/tests/mocks/user-token";

describe("UserTokenService > create", () => {
	let service: UserTokenService;

	const userId = v4();

	const integrations = IntegrationsValues();

	beforeAll(async () => {
		service = await UserTokenMock.service();
	});

	beforeEach(() => {
		UserTokenMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create UserToken with valid params", async () => {
		const userTokenDoc = UserTokenMock.doc({
			userId,
		});

		UserTokenMock.repository.save.mockReturnValue(userTokenDoc);

		const UserToken = await service.create({
			userId,
		});

		expect(UserTokenMock.repository.save).toBeCalledTimes(1);
		expect(UserToken).toMatchObject(userTokenDoc);
	});

	it("should create UserToken with valid params (with integrations)", async () => {
		const accessToken = "example-access-token";
		const refreshToken = "example-refresh-token";
		const expirationDate = TimeUtil.newDate(
			TimeUtil.newDate().getTime() + TimeUtil.ONE_DAY,
		);

		const docs = integrations.map(integration =>
			UserTokenMock.doc({
				userId,
				type: integration,
				accessToken,
				refreshToken,
				expirationDate,
			}),
		);

		docs.forEach(doc => UserTokenMock.repository.save.mockReturnValueOnce(doc));

		const UserToken = await Promise.all(
			integrations.map(integration =>
				service.create({
					userId,
					type: integration,
					accessToken,
					refreshToken,
					expirationDate,
				}),
			),
		);

		expect(UserTokenMock.repository.save).toBeCalledTimes(integrations.length);
		expect(UserToken).toMatchObject(docs);
	});
});
