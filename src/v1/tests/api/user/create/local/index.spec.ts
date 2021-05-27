import { PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

import { ConfirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { ContactMock } from "v1/tests/mocks/contact";
import { UserMock } from "v1/tests/mocks/user";

describe("UserService > create > local", () => {
	let service: UserService;

	const userId = v4();

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		const userDoc = UserMock.doc({
			id: userId,
			username: "example",
		});
		const contactDoc = ContactMock.doc({
			userId: userId,
			type: ContactTypeEnum.EMAIL,
			value: "foo@bar.com",
			primary: true,
		});
		const confirmationTokenDoc = ConfirmationTokenMock.doc({
			userId: userId,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		UserMock.repository.save.mockResolvedValue({
			...userDoc,
			contacts: [contactDoc],
		});
		ConfirmationTokenMock.repository.save.mockResolvedValue(
			confirmationTokenDoc,
		);

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
		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			contactId: contactDoc.id,
			verificationCode: confirmationTokenDoc.token,
			email: "foo@bar.com",
			username: "example",
		});
	});

	it("should fail because duplicated username", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
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
		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['User with username "example" already exists'],
		});
	});

	it("should fail because duplicated email", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
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
		expect(ConfirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['Email "foo@bar.com" is already linked to an user'],
		});
	});
});
