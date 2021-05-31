import { PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { ContactService } from "v1/api/contact/contact.service";

import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

import { confirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { contactMock } from "v1/tests/mocks/contact";

describe("ContactService > create", () => {
	let service: ContactService;

	const userId = v4();
	const email = "foo@bar.com";

	beforeAll(async () => {
		service = await contactMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create contact with valid params (email)", async () => {
		const contactDoc = contactMock.doc({
			userId,
			type: ContactTypeEnum.EMAIL,
			value: email,
		});
		const confirmationTokenDoc = confirmationTokenMock.doc({
			contactId: contactDoc.id,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			token: pinUtil.gen(6),
		});

		contactMock.repository.save.mockResolvedValue([contactDoc]);

		confirmationTokenMock.repository.save.mockResolvedValue([
			confirmationTokenDoc,
		]);

		const result = await service.create({
			userId,
			contacts: [
				{
					type: ContactTypeEnum.EMAIL,
					value: email,
				},
			],
		});

		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual([
			{
				...contactDoc,
				confirmationTokens: [confirmationTokenDoc],
			},
		]);
	});

	it("should create contact with valid params (brazzilian cellphone)", async () => {
		const contactDoc = contactMock.doc({
			userId,
			type: ContactTypeEnum.PHONE_NUMBER,
			value: "19999904610",
		});
		const confirmationTokenDoc = confirmationTokenMock.doc({
			contactId: contactDoc.id,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			token: pinUtil.gen(6),
		});

		contactMock.repository.save.mockResolvedValue([contactDoc]);

		confirmationTokenMock.repository.save.mockResolvedValue([
			confirmationTokenDoc,
		]);

		const result = await service.create({
			userId,
			contacts: [
				{
					type: ContactTypeEnum.PHONE_NUMBER,
					value: "19999904610",
				},
			],
		});

		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual([
			{
				...contactDoc,
				confirmationTokens: [confirmationTokenDoc],
			},
		]);
	});

	it("should fail because duplicated value (email)", async () => {
		contactMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: "Key (value)=(foo@bar.com) already exists.",
			table: "contacts",
		});

		let result;

		try {
			result = await service.create({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: email,
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['Email "foo@bar.com" is already linked to an user'],
		});
	});

	it("should fail because duplicated value (brazzilian cellphone)", async () => {
		contactMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: "Key (value)=(19999904610) already exists.",
			table: "contacts",
		});

		let result;

		try {
			result = await service.create({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.PHONE_NUMBER,
						value: "19999904610",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['Phone "19999904610" is already linked to an user'],
		});
	});

	it("should fail user not exists", async () => {
		contactMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.ForeignKeyViolation,
			detail: `Key (user_id)=(${userId}) is not present in table "users".`,
			table: "contacts",
		});

		let result;

		try {
			result = await service.create({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.PHONE_NUMBER,
						value: "19999904610",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(contactMock.repository.save).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.status).toBe(409);
		expect(result.response).toStrictEqual({
			errors: [`User with id "${userId}" not found`],
		});
	});
});
