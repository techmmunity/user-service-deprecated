import { PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

import { confirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { contactMock } from "v1/tests/mocks/contact";
import { userMock } from "v1/tests/mocks/user";

describe("UserService > create > local", () => {
	let service: UserService;

	const userId = v4();
	const email = "foo@bar.com";
	const username = "example";
	const password = "p7qV%Ews";

	beforeAll(async () => {
		service = await userMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		const userDoc = userMock.doc({
			id: userId,
			username,
		});
		const contactDoc = contactMock.doc({
			userId,
			type: ContactTypeEnum.EMAIL,
			value: email,
			primary: true,
		});
		const confirmationTokenDoc = confirmationTokenMock.doc({
			userId,
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		});

		userMock.repository.save.mockResolvedValue({
			...userDoc,
			contacts: [contactDoc],
		});
		confirmationTokenMock.repository.save.mockResolvedValue(
			confirmationTokenDoc,
		);

		let result;

		try {
			result = await service.createLocal({
				email,
				username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.save).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			userId,
			contactId: contactDoc.id,
			verificationCode: confirmationTokenDoc.token,
			email,
			username,
		});
	});

	it("should fail because duplicated username", async () => {
		userMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: "Key (username)=(example) already exists.",
			table: "users",
		});

		let result;

		try {
			result = await service.createLocal({
				email,
				username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.save).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['User with username "example" already exists'],
		});
	});

	it("should fail because duplicated email", async () => {
		userMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: "Key (value)=(foo@bar.com) already exists.",
			table: "contacts",
		});

		let result;

		try {
			result = await service.createLocal({
				email,
				username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(userMock.repository.save).toBeCalledTimes(1);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(result.response).toStrictEqual({
			errors: ['Email "foo@bar.com" is already linked to an user'],
		});
	});
});
