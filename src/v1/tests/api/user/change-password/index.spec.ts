import * as moment from "moment";
import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

import { confirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { userMock } from "v1/tests/mocks/user";

describe("UserService > changePassword", () => {
	let service: UserService;

	const confirmationTokenId = v4();
	const newPassword = "t6@CKCR";

	beforeAll(async () => {
		service = await userMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should update user password with valid params", async () => {
		const confirmationTokenDoc = confirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);
		userMock.repository.update.mockResolvedValue({
			affected: 1,
		});

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId: confirmationTokenDoc.userId,
		});
	});

	it("should throw an error if confirmationToken not found", async () => {
		confirmationTokenMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["Confirmation token not found"],
		});
	});

	it(`should throw an error if confirmationToken type !== ${ConfirmationTokenTypeEnum.CHANGE_PASSWORD}`, async () => {
		const confirmationTokenDoc = confirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.REMOVE_CONTACT,
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid confirmation token"],
		});
	});

	it("should throw an error if confirmationToken doesn't have an userId", async () => {
		const confirmationTokenDoc = confirmationTokenMock.doc({
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid confirmation token"],
		});
	});

	it("should throw an error if confirmationToken is already used", async () => {
		const confirmationTokenDoc = confirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
			usedAt: new Date(),
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: ["Confirmation token already used"],
		});
	});

	it("should throw an error if confirmationToken is expired", async () => {
		const confirmationTokenDoc = confirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
			createdAt: moment().add(-1, "month").toDate(),
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: ["Confirmation token is expired"],
		});
	});

	it("should throw an error if user not updated", async () => {
		const confirmationTokenDoc = confirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);
		userMock.repository.update.mockResolvedValue({
			affected: 0,
		});

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(userMock.repository.update).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["User not found"],
		});
	});
});
