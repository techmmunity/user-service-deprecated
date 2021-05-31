import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { passwordUtil } from "v1/utils/password";
import { pinUtil } from "v1/utils/pin";

import { userMock } from "v1/tests/mocks/user";

describe("UserService > login > local", () => {
	let service: UserService;

	const userId = v4();
	const pin = pinUtil.gen();
	const email = "foo@bar.com";
	const username = "foo_bar";
	const passwordEncrypted = passwordUtil.encrypt("54GbrFz%");
	const passwordDecrypted = "54GbrFz%";

	beforeAll(async () => {
		service = await userMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should do login with valid params (email)", async () => {
		const userDoc = {
			id: userId,
			pin,
			password: passwordEncrypted,
			verified: true,
		};

		userMock.repository.query.mockResolvedValue([userDoc]);

		const result = await service.loginLocal({
			password: passwordDecrypted,
			identifier: email,
		});

		expect(userMock.repository.query).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			pin: userDoc.pin,
		});
	});

	it("should do login with valid params (username)", async () => {
		const userDoc = {
			id: userId,
			pin,
			password: passwordEncrypted,
			verified: true,
		};

		userMock.repository.query.mockResolvedValue([userDoc]);

		const result = await service.loginLocal({
			password: passwordDecrypted,
			identifier: username,
		});

		expect(userMock.repository.query).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			pin: userDoc.pin,
		});
	});

	it("should throw an error with unverified user", async () => {
		const userDoc = {
			id: userId,
			pin,
			password: passwordEncrypted,
			verified: false,
		};

		userMock.repository.query.mockResolvedValue([userDoc]);

		let result;

		try {
			result = await service.loginLocal({
				password: passwordDecrypted,
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(userMock.repository.query).toBeCalledTimes(1);
		expect(result.status).toBe(403);
		expect(result.response).toStrictEqual({
			errors: ["Contact unverified"],
		});
	});

	it("should throw an error with invalid password", async () => {
		const userDoc = {
			id: userId,
			pin,
			password: passwordEncrypted,
			verified: true,
		};

		userMock.repository.query.mockResolvedValue([userDoc]);

		let result;

		try {
			result = await service.loginLocal({
				password: "7&ufYzVB",
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(userMock.repository.query).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid username, email or password"],
		});
	});

	it("should throw an error if not found user", async () => {
		userMock.repository.query.mockResolvedValue([]);

		let result;

		try {
			result = await service.loginLocal({
				password: passwordDecrypted,
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(userMock.repository.query).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["User not found"],
		});
	});
});
