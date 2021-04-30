import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { UserMock } from "v1/tests/mocks/user";

describe("UserService > login > local", () => {
	let service: UserService;

	const id = v4();
	const email = "foo@bar.com";
	const username = "foo_bar";
	const password = "54GbrFz%";
	const verifiedAt = new Date();

	beforeAll(async () => {
		service = await UserMock.service();
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should do login with valid params (email)", async () => {
		const userDoc = UserMock.doc({
			id,
			password,
			username,
			verifiedAt,
		});

		UserMock.repository.findOne.mockResolvedValue(userDoc);

		const result = await service.loginLocal({
			password,
			identifier: email,
		});

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			id,
			pin: userDoc.pin,
		});
	});

	it("should do login with valid params (username)", async () => {
		const userDoc = UserMock.doc({
			id,
			password,
			username,
			verifiedAt,
		});

		UserMock.repository.findOne.mockResolvedValue(userDoc);

		const result = await service.loginLocal({
			password,
			identifier: username,
		});

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			id,
			pin: userDoc.pin,
		});
	});

	it("should do login with valid params (username and avatar)", async () => {
		const userDoc = UserMock.doc({
			id,
			password,
			username,
			verifiedAt,
			avatar: "http://example-avatar.com",
		});

		UserMock.repository.findOne.mockResolvedValue(userDoc);

		const result = await service.loginLocal({
			password,
			identifier: username,
		});

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			id,
			pin: userDoc.pin,
		});
	});

	// it("should throw an error with unverified user", async () => {
	// 	const userDoc = UserMock.doc({
	// 		id,
	// 		password,
	// 		username,
	// 	});

	// 	UserMock.repository.findOne.mockResolvedValue(userDoc);

	// 	let result;

	// 	try {
	// 		result = await service.loginLocal({
	// 			password,
	// 			identifier: username,
	// 		});
	// 	} catch (err) {
	// 		result = err;
	// 	}

	// 	expect(UserMock.repository.findOne).toBeCalledTimes(1);
	// 	expect(result.status).toBe(403);
	// 	expect(result.response).toStrictEqual({
	// 		errors: ["Account unverified"],
	// 	});
	// });

	it("should throw an error with invalid password", async () => {
		const userDoc = UserMock.doc({
			id,
			password,
			username,
			verifiedAt,
		});

		UserMock.repository.findOne.mockResolvedValue(userDoc);

		let result;

		try {
			result = await service.loginLocal({
				password: "7&ufYzVB",
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid username, email or password"],
		});
	});

	it("should throw an error if not found user", async () => {
		UserMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.loginLocal({
				password,
				identifier: username,
			});
		} catch (err) {
			result = err;
		}

		expect(UserMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["User not found"],
		});
	});
});
