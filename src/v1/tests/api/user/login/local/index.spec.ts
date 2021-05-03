import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { PasswordUtil } from "v1/utils/password";
import { PinUtil } from "v1/utils/pin";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > login > local", () => {
	let service: UserService;

	const id = v4();
	const pin = PinUtil.gen();
	const email = "foo@bar.com";
	const username = "foo_bar";
	const passwordEncrypted = PasswordUtil.encrypt("54GbrFz%");
	const passwordDecrypted = "54GbrFz%";

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should do login with valid params (email)", async () => {
		const userDoc = {
			id,
			pin,
			password: passwordEncrypted,
			verified: true,
		};

		UserMock.repository.query.mockResolvedValue([userDoc]);

		const result = await service.loginLocal({
			password: passwordDecrypted,
			identifier: email,
		});

		expect(UserMock.repository.query).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			id,
			pin: userDoc.pin,
		});
	});

	it("should do login with valid params (username)", async () => {
		const userDoc = {
			id,
			pin,
			password: passwordEncrypted,
			verified: true,
		};

		UserMock.repository.query.mockResolvedValue([userDoc]);

		const result = await service.loginLocal({
			password: passwordDecrypted,
			identifier: username,
		});

		expect(UserMock.repository.query).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			id,
			pin: userDoc.pin,
		});
	});

	it("should throw an error with unverified user", async () => {
		const userDoc = {
			id,
			pin,
			password: passwordEncrypted,
			verified: false,
		};

		UserMock.repository.query.mockResolvedValue([userDoc]);

		let result;

		try {
			result = await service.loginLocal({
				password: passwordDecrypted,
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.query).toBeCalledTimes(1);
		expect(result.status).toBe(403);
		expect(result.response).toStrictEqual({
			errors: ["Contact unverified"],
		});
	});

	it("should throw an error with invalid password", async () => {
		const userDoc = {
			id,
			pin,
			password: passwordEncrypted,
			verified: true,
		};

		UserMock.repository.query.mockResolvedValue([userDoc]);

		let result;

		try {
			result = await service.loginLocal({
				password: "7&ufYzVB",
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.query).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid username, email or password"],
		});
	});

	it("should throw an error if not found user", async () => {
		UserMock.repository.query.mockResolvedValue([]);

		let result;

		try {
			result = await service.loginLocal({
				password: passwordDecrypted,
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.query).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["User not found"],
		});
	});
});
