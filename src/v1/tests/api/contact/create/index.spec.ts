import { v4 } from "uuid";

import { ContactService } from "v1/api/contact/contact.service";

import { ContactTypeEnum } from "core/enums/contact-type";
import { DbErrorEnum } from "core/enums/db-error";

import { ContactMock } from "v1/tests/mocks/contact";

describe("ContactService > create", () => {
	let service: ContactService;

	const userId = v4();

	beforeAll(async () => {
		service = await ContactMock.service();
	});

	beforeEach(() => {
		ContactMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create contact with valid params (email)", async () => {
		const doc = ContactMock.doc({
			userId,
			type: ContactTypeEnum.EMAIL,
			value: "foo@bar.com",
		});

		ContactMock.repository.save.mockResolvedValue([doc]);

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
		expect(result).toStrictEqual([doc]);
	});

	it("should create contact with valid params (brazzilian cellphone)", async () => {
		const doc = ContactMock.doc({
			userId,
			type: ContactTypeEnum.PHONE_NUMBER,
			value: "19999904610",
		});

		ContactMock.repository.save.mockResolvedValue([doc]);

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
		expect(result).toStrictEqual([doc]);
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
		expect(result.response).toStrictEqual({
			errors: ['Email "foo@bar.com" is already linked to an user'],
		});
	});

	it("should create contact with valid params (brazzilian cellphone)", async () => {
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
		expect(result.response).toStrictEqual({
			errors: ['Phone "19999904610" is already linked to an user'],
		});
	});
});
