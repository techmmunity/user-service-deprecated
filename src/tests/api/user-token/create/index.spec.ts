import { v4 } from "uuid";

import { UserTokenService } from "api/user-token/user-token.service";

import { UserTokenMock } from "tests/mocks/user-token";

const userId = v4();

describe("UserTokenService > create", () => {
	let service: UserTokenService;

	beforeAll(async () => {
		service = await UserTokenMock.service();
	});

	beforeEach(() => {
		UserTokenMock.repository.save.mockReset();
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
});
