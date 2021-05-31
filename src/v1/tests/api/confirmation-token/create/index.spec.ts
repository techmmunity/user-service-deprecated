import { PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { ConfirmationTokenService } from "v1/api/confirmation-token/confirmation-token.service";

import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

import { confirmationTokenMock } from "v1/tests/mocks/confirmation-token";

describe("ConfirmationTokenService > create", () => {
	let service: ConfirmationTokenService;

	const userId = v4();
	const contactId = v4();
	const verificationCode = pinUtil.gen(6);

	beforeAll(async () => {
		service = await confirmationTokenMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should crete confirmation token with valid params (with userId)", async () => {
		const confirmationToken = confirmationTokenMock.doc({
			userId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		confirmationTokenMock.repository.save.mockResolvedValue(confirmationToken);

		let result;

		try {
			result = await service.create({
				userId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual(confirmationToken);
	});

	it("should crete confirmation token with valid params (with contactId)", async () => {
		const confirmationToken = confirmationTokenMock.doc({
			contactId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		confirmationTokenMock.repository.save.mockResolvedValue(confirmationToken);

		let result;

		try {
			result = await service.create({
				contactId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual(confirmationToken);
	});

	it("should fail user not exists", async () => {
		confirmationTokenMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.ForeignKeyViolation,
			detail: `Key (user_id)=(${userId}) is not present in table "users".`,
			table: "confirmation_tokens",
		});

		let result;

		try {
			result = await service.create({
				userId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`User with id "${userId}" not found`],
		});
	});

	it("should fail contact not exists", async () => {
		confirmationTokenMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.ForeignKeyViolation,
			detail: `Key (contact_id)=(${contactId}) is not present in table "users".`,
			table: "confirmation_tokens",
		});

		let result;

		try {
			result = await service.create({
				contactId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(confirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`Contact with id "${contactId}" not found`],
		});
	});
});
