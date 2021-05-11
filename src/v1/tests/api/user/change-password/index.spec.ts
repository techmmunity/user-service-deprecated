import * as moment from "moment";
import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

import { ConfirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { UserMock } from "v1/tests/mocks/user";

describe("UserService > changePassword", () => {
	let service: UserService;

	const confirmationTokenId = v4();
	const newPassword = "t6@CKCR";

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should update user password with valid params", async () => {
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});

		ConfirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);
		UserMock.repository.update.mockResolvedValue({
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

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result).toBeUndefined();
	});

	it("should throw an error if confirmationToken not found", async () => {
		ConfirmationTokenMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.changePassword({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["Confirmation token not found"],
		});
	});

	it(`should throw an error if confirmationToken type !== ${ConfirmationTokenTypeEnum.CHANGE_PASSWORD}`, async () => {
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.REMOVE_CONTACT,
		});

		ConfirmationTokenMock.repository.findOne.mockResolvedValue(
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

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid confirmation token"],
		});
	});

	it("should throw an error if confirmationToken doesn't have an userId", async () => {
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});

		ConfirmationTokenMock.repository.findOne.mockResolvedValue(
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

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["Invalid confirmation token"],
		});
	});

	it("should throw an error if confirmationToken is already used", async () => {
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
			usedAt: new Date(),
		});

		ConfirmationTokenMock.repository.findOne.mockResolvedValue(
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

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: ["Confirmation token already used"],
		});
	});

	it("should throw an error if confirmationToken is expired", async () => {
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
			createdAt: moment().add(-1, "month").toDate(),
		});

		ConfirmationTokenMock.repository.findOne.mockResolvedValue(
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

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(0);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: ["Confirmation token is expired"],
		});
	});

	it("should throw an error if user not updated", async () => {
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: v4(),
			token: "123456",
			type: ConfirmationTokenTypeEnum.CHANGE_PASSWORD,
		});

		ConfirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationTokenDoc,
		);
		UserMock.repository.update.mockResolvedValue({
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

		expect(ConfirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(UserMock.repository.update).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["User not found"],
		});
	});
});
