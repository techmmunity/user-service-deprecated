import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";
import { DbErrorEnum } from "core/enums/db-error";

import { ConfirmationTokenMock } from "v1/tests/mocks/confirmation-token";
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
		ConfirmationTokenMock.repository.resetMock();
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
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: id,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		UserMock.repository.save.mockResolvedValue({
			...userDoc,
			confirmationTokens: [confirmationTokenDoc],
			contacts: [contactDoc],
		});

		let result;

		try {
			result = await service.createLocal({
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
			});
		} catch (e) {
			result = e;
		}

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(ContactMock.repository.save).toBeCalledTimes(0);
		expect(ContactMock.repository.insert).toBeCalledTimes(0);
		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(ConfirmationTokenMock.repository.insert).toBeCalledTimes(0);
		expect(result).toStrictEqual({
			userId: id,
			username: userDoc.username,
			email: contactDoc.value,
			verificationCode: confirmationTokenDoc.token,
		});
	});

	it("should fail because duplicated username", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.UniqueViolation,
			detail: "Key (username)=(example) already exists.",
			table: "users",
		});

		let result;

		try {
			result = await service.createLocal({
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
			});
		} catch (e) {
			result = e;
		}

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: ['User with username "example" already exists'],
		});
	});

	it("should fail because duplicated email", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: DbErrorEnum.UniqueViolation,
			detail: "Key (value)=(foo@bar.com) already exists.",
			table: "contacts",
		});

		let result;

		try {
			result = await service.createLocal({
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
			});
		} catch (e) {
			result = e;
		}

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: ['Email "foo@bar.com" is already linked to an user'],
		});
	});
});
