import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ContactTypeEnum } from "core/enums/contact-type";

import { ContactMock } from "v1/tests/mocks/contact";
import { UserMock } from "v1/tests/mocks/user";

describe("UserService > create > local", () => {
	let service: UserService;

	const id = v4();

	beforeAll(async () => {
		service = await UserMock.service();
	});

	beforeEach(() => {
		UserMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		const userDoc = UserMock.doc({
			id,
			username: "example",
		});
		const contactDoc = ContactMock.doc({
			userId: id,
			type: ContactTypeEnum.EMAIL,
			value: "foo@bar.com",
			primary: true,
		});

		UserMock.repository.save.mockReturnValue({
			...userDoc,
			contacts: [contactDoc],
		});

		const result = await service.createLocal({
			email: "foo@bar.com",
			username: "example",
			password: "p7qV%Ews",
		});

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(ContactMock.repository.save).toBeCalledTimes(0);
		expect(ContactMock.repository.insert).toBeCalledTimes(0);
		expect(result).toStrictEqual({
			userId: id,
			verificationCode: userDoc.pin,
		});
	});
});
