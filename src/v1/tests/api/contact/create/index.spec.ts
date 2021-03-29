import { v4 } from "uuid";

import { ContactService } from "v1/api/contact/contact.service";

import { ContactTypeEnum } from "core/enums/contact-type";

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

		ContactMock.repository.save.mockReturnValue([doc]);

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

		ContactMock.repository.save.mockReturnValue([doc]);

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
});
