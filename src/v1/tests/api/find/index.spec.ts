import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ContactTypeEnum } from "core/enums/contact-type";

import { contactMock } from "v1/tests/mocks/contact";
import { userMock } from "v1/tests/mocks/user";

describe("UserService > find", () => {
	let service: UserService;

	const userId = v4();
	const email = "foo@bar.com";
	const username = "foo_bar";
	const phone = "+5519999904610";

	const userNorFoundErrorMessage = "User not found";

	beforeAll(async () => {
		service = await userMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should find user (with identifier=userId)", async () => {
		userMock.repository.find.mockResolvedValue([
			userMock.doc({
				id: userId,
				username,
			}),
		]);
		contactMock.repository.find.mockResolvedValue([]);
		contactMock.repository.findOne.mockResolvedValue(
			contactMock.doc({
				userId,
				type: ContactTypeEnum.EMAIL,
				value: email,
				primary: true,
			}),
		);

		let result;

		try {
			result = await service.find({
				identifier: userId,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			username,
			primaryContact: email,
			primaryContactType: ContactTypeEnum.EMAIL,
		});
	});

	it("should find user (with identifier=username)", async () => {
		userMock.repository.find.mockResolvedValue([
			userMock.doc({
				id: userId,
				username,
			}),
		]);
		contactMock.repository.find.mockResolvedValue([]);
		contactMock.repository.findOne.mockResolvedValue(
			contactMock.doc({
				userId,
				type: ContactTypeEnum.EMAIL,
				value: email,
				primary: true,
			}),
		);

		let result;

		try {
			result = await service.find({
				identifier: username,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			username,
			primaryContact: email,
			primaryContactType: ContactTypeEnum.EMAIL,
		});
	});

	it("should find user (with identifier=email)", async () => {
		userMock.repository.find.mockResolvedValue([]);
		contactMock.repository.find.mockResolvedValue([
			{
				...contactMock.doc({
					userId,
					type: ContactTypeEnum.EMAIL,
					value: email,
				}),
				user: userMock.doc({
					id: userId,
					username,
				}),
			},
		]);
		contactMock.repository.findOne.mockResolvedValue(
			contactMock.doc({
				userId,
				type: ContactTypeEnum.EMAIL,
				value: "foo1@bar.com",
				primary: true,
			}),
		);

		let result;

		try {
			result = await service.find({
				identifier: email,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			username,
			primaryContact: "foo1@bar.com",
			primaryContactType: ContactTypeEnum.EMAIL,
		});
	});

	it("should find user (with identifier=phone)", async () => {
		userMock.repository.find.mockResolvedValue([]);
		contactMock.repository.find.mockResolvedValue([
			{
				...contactMock.doc({
					userId,
					type: ContactTypeEnum.PHONE_NUMBER,
					value: phone,
				}),
				user: userMock.doc({
					id: userId,
					username,
				}),
			},
		]);
		contactMock.repository.findOne.mockResolvedValue(
			contactMock.doc({
				userId,
				type: ContactTypeEnum.EMAIL,
				value: email,
				primary: true,
			}),
		);

		let result;

		try {
			result = await service.find({
				identifier: email,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			username,
			primaryContact: email,
			primaryContactType: ContactTypeEnum.EMAIL,
		});
	});

	it("should find user (contact beign primary contact)", async () => {
		userMock.repository.find.mockResolvedValue([]);
		contactMock.repository.find.mockResolvedValue([
			{
				...contactMock.doc({
					userId,
					type: ContactTypeEnum.PHONE_NUMBER,
					value: phone,
					primary: true,
				}),
				user: userMock.doc({
					id: userId,
					username,
				}),
			},
		]);

		let result;

		try {
			result = await service.find({
				identifier: email,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(0);
		expect(result).toStrictEqual({
			userId,
			username,
			primaryContact: phone,
			primaryContactType: ContactTypeEnum.PHONE_NUMBER,
		});
	});

	it("should throw an error (found contact but not primary contact)", async () => {
		userMock.repository.find.mockResolvedValue([]);
		contactMock.repository.find.mockResolvedValue([
			{
				...contactMock.doc({
					userId,
					type: ContactTypeEnum.EMAIL,
					value: email,
				}),
				user: userMock.doc({
					id: userId,
					username,
				}),
			},
		]);
		contactMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.find({
				identifier: userId,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			errors: [userNorFoundErrorMessage],
		});
	});

	it("should throw an error (found user but not primary contact)", async () => {
		userMock.repository.find.mockResolvedValue([
			userMock.doc({
				id: userId,
				username,
			}),
		]);
		contactMock.repository.find.mockResolvedValue([]);
		contactMock.repository.findOne.mockResolvedValueOnce(undefined);

		let result;

		try {
			result = await service.find({
				identifier: userId,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			errors: [userNorFoundErrorMessage],
		});
	});

	it("should throw an error (not found anything)", async () => {
		userMock.repository.find.mockResolvedValue([]);
		contactMock.repository.find.mockResolvedValue([]);

		let result;

		try {
			result = await service.find({
				identifier: userId,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.find).toBeCalledTimes(1);
		expect(contactMock.repository.findOne).toBeCalledTimes(0);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			errors: [userNorFoundErrorMessage],
		});
	});
});
