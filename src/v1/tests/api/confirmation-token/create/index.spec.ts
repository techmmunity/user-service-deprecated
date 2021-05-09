import { v4 } from "uuid";

import { ConfirmationTokenService } from "v1/api/confirmation-token/confirmation-token.service";

import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { DbErrorEnum } from "core/enums/db-error";

import { ConfirmationTokenMock } from "v1/tests/mocks/confirmation-token";

describe("ConfirmationTokenService > create", () => {
	let service: ConfirmationTokenService;

	const userId = v4();
	const contactId = v4();
	const verificationCode = PinUtil.gen(6);

	beforeAll(async () => {
		service = await ConfirmationTokenMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should crete confirmation token with valid params (with userId)", async () => {
		const confirmationToken = ConfirmationTokenMock.doc({
			userId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		ConfirmationTokenMock.repository.save.mockResolvedValue(confirmationToken);

		let result;

		try {
			result = await service.create({
				userId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual(confirmationToken);
	});

	it("should crete confirmation token with valid params (with contactId)", async () => {
		const confirmationToken = ConfirmationTokenMock.doc({
			contactId,
			token: verificationCode,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		ConfirmationTokenMock.repository.save.mockResolvedValue(confirmationToken);

		let result;

		try {
			result = await service.create({
				contactId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual(confirmationToken);
	});

	it("should fail user not exists", async () => {
		ConfirmationTokenMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.ForeignKeyViolation,
			detail:
				'Key (user_id)=(0b36f77b-5f24-40bc-8823-e19cf502292e) is not present in table "users".',
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

		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`User or contact with id "${userId}" not found`],
		});
	});

	it("should fail contact not exists", async () => {
		ConfirmationTokenMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.ForeignKeyViolation,
			detail:
				'Key (user_id)=(0b36f77b-5f24-40bc-8823-e19cf502292e) is not present in table "users".',
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

		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`User or contact with id "${contactId}" not found`],
		});
	});
});
