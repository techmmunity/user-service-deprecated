import { v4 } from "uuid";

import { ContactService } from "v1/api/contact/contact.service";

import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";
import { DbErrorEnum } from "core/enums/db-error";

import { ConfirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { ContactMock } from "v1/tests/mocks/contact";

describe("ContactService > create", () => {
	let service: ContactService;

	const userId = v4();

	beforeAll(async () => {
		service = await ContactMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create contact with valid params (email)", async () => {
		const contactDoc = ContactMock.doc({
			userId,
			type: ContactTypeEnum.EMAIL,
			value: "foo@bar.com",
		});
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			contactId: contactDoc.id,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			token: PinUtil.gen(6),
		});

		ContactMock.repository.save.mockResolvedValue([contactDoc]);

		ConfirmationTokenMock.repository.save.mockResolvedValue([
			confirmationTokenDoc,
		]);

		const result = await service.create({
			userId,
			contacts: [
				{
					type: ContactTypeEnum.EMAIL,
					value: "foo@bar.com",
				},
			],
		});

		expect(ContactMock.repository.save).toBeCalledTimes(1);
		expect(ContactMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual([
			{
				...contactDoc,
				confirmationTokens: [confirmationTokenDoc],
			},
		]);
	});

	it("should create contact with valid params (brazzilian cellphone)", async () => {
		const contactDoc = ContactMock.doc({
			userId,
			type: ContactTypeEnum.PHONE_NUMBER,
			value: "19999904610",
		});
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			contactId: contactDoc.id,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			token: PinUtil.gen(6),
		});

		ContactMock.repository.save.mockResolvedValue([contactDoc]);

		ConfirmationTokenMock.repository.save.mockResolvedValue([
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

		expect(ContactMock.repository.save).toBeCalledTimes(1);
		expect(ContactMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual([
			{
				...contactDoc,
				confirmationTokens: [confirmationTokenDoc],
			},
		]);
	});

	it("should fail because duplicated value (email)", async () => {
		ContactMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.UniqueViolation,
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
						value: "foo@bar.com",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(ContactMock.repository.save).toBeCalledTimes(1);
		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['Email "foo@bar.com" is already linked to an user'],
		});
	});

	it("should fail because duplicated value (brazzilian cellphone)", async () => {
		ContactMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.UniqueViolation,
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

		expect(ContactMock.repository.save).toBeCalledTimes(1);
		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['Phone "19999904610" is already linked to an user'],
		});
	});
});
