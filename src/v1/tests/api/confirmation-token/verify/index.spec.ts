import * as moment from "moment";
import { v4 } from "uuid";

import { ConfirmationTokenService } from "v1/api/confirmation-token/confirmation-token.service";

import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

import { confirmationTokenMock } from "v1/tests/mocks/confirmation-token";

describe("ConfirmationTokenService > verify", () => {
	let service: ConfirmationTokenService;

	const contactId = v4();
	const verificationCode = pinUtil.gen(6);

	beforeAll(async () => {
		service = await confirmationTokenMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should verify confirmation token with valid params", async () => {
		const confirmationToken = confirmationTokenMock.doc({
			contactId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationToken,
		);

		let result;

		try {
			result = await service.verify({
				contactId,
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.update).toBeCalledTimes(1);
		expect(result).toBeUndefined();
	});

	it("should throw error if confirmation token not exists", async () => {
		confirmationTokenMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.verify({
				contactId,
				verificationCode,
			});
		} catch (err) {
			result = err;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toMatchObject({
			errors: ["Invalid contactId or verificationCode"],
		});
	});

	it("should throw error if confirmation token is already used", async () => {
		const confirmationToken = confirmationTokenMock.doc({
			contactId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			usedAt: moment().add(-3, "days").toDate(),
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationToken,
		);

		let result;

		try {
			result = await service.verify({
				contactId,
				verificationCode,
			});
		} catch (err) {
			result = err;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(409);
		expect(result.response).toMatchObject({
			errors: ["Confirmation token already used"],
		});
	});

	it("should throw error if confirmation token is expired", async () => {
		const confirmationToken = confirmationTokenMock.doc({
			contactId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			createdAt: moment().add(-3, "years").toDate(),
		});

		confirmationTokenMock.repository.findOne.mockResolvedValue(
			confirmationToken,
		);

		let result;

		try {
			result = await service.verify({
				contactId,
				verificationCode,
			});
		} catch (err) {
			result = err;
		}

		expect(confirmationTokenMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(409);
		expect(result.response).toMatchObject({
			errors: ["Confirmation token is expired"],
		});
	});
});
