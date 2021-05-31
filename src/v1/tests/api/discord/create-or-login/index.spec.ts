import { PgErrorEnum } from "@techmmunity/database-error-handler";
import * as moment from "moment";
import { v4 } from "uuid";

import { DiscordService } from "v1/api/discord/discord.service";

import { ContactTypeEnum } from "core/enums/contact-type";

import { confirmationTokenMock } from "v1/tests/mocks/confirmation-token";
import { contactMock } from "v1/tests/mocks/contact";
import { discordMock } from "v1/tests/mocks/discord";
import { userMock } from "v1/tests/mocks/user";

describe("DiscordService > create-or-login", () => {
	let service: DiscordService;

	const userId = v4();
	const username = "foo_bar";
	const email = "foo@bar.com";
	const discordUserId = "308994132968210433";
	const discordAccessToken = "3bcrVOWjlrzlJWu240yODtJRHcZB1l";
	const discordRefreshToken = "CZhtkLDpNYXgPH9Ml6shqh2OwykChw";
	const discordExpirationDate = moment().add(3, "days");

	beforeAll(async () => {
		service = await discordMock.service();
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
		const discordDoc = discordMock.doc({
			userId,
			discordUserId,
			discordAccessToken,
			discordRefreshToken,
			discordExpirationDate: discordExpirationDate.toDate(),
		});

		discordMock.repository.findOne.mockResolvedValue(undefined);

		discordMock.repository.save.mockResolvedValue({
			...discordDoc,
			user: {
				...userDoc,
				contacts: [contactDoc],
			},
		});

		let result;

		try {
			result = await service.createOrLogin({
				username,
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis: discordExpirationDate.valueOf(),
			});
		} catch (e) {
			result = e;
		}

		expect(discordMock.repository.findOne).toBeCalledTimes(1);
		expect(discordMock.repository.save).toBeCalledTimes(1);
		expect(discordMock.repository.update).toBeCalledTimes(0);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(1);
		expect(result).toHaveProperty("userId");
		expect(result).toHaveProperty("pin");
		expect(result.userId).toBe(userId);
		expect(typeof result.pin).toBe("string");
		expect(result.pin).toHaveLength(4);
		expect(/^\d+$/.test(result.pin)).toBeTruthy();
	});

	it("should login user with valid params", async () => {
		const userDoc = userMock.doc({
			id: userId,
			username,
		});
		const discordDoc = discordMock.doc({
			userId,
			discordUserId,
			discordAccessToken,
			discordRefreshToken,
			discordExpirationDate: discordExpirationDate.toDate(),
		});

		const save = jest.fn();

		discordMock.repository.findOne.mockResolvedValue({
			...discordDoc,
			user: userDoc,
			save,
		});

		let result;

		try {
			result = await service.createOrLogin({
				username,
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis: discordExpirationDate.valueOf(),
			});
		} catch (e) {
			result = e;
		}

		expect(discordMock.repository.findOne).toBeCalledTimes(1);
		expect(discordMock.repository.save).toBeCalledTimes(0);
		expect(discordMock.repository.update).toBeCalledTimes(0);
		expect(confirmationTokenMock.repository.save).toBeCalledTimes(0);
		expect(save).toBeCalledTimes(1);
		expect(result).toHaveProperty("userId");
		expect(result).toHaveProperty("pin");
		expect(result.userId).toBe(userId);
		expect(typeof result.pin).toBe("string");
		expect(result.pin).toHaveLength(4);
		expect(/^\d+$/.test(result.pin)).toBeTruthy();
	});

	it("should fail because duplicated username", async () => {
		discordMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (username)=(${username}) already exists.`,
			table: "users",
		});

		let result;

		try {
			result = await service.createOrLogin({
				username,
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis: discordExpirationDate.valueOf(),
			});
		} catch (e) {
			result = e;
		}

		expect(discordMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`User with username "${username}" already exists`],
		});
	});

	it("should fail because duplicated email", async () => {
		discordMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (value)=(${email}) already exists.`,
			table: "contacts",
		});

		let result;

		try {
			result = await service.createOrLogin({
				username,
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis: discordExpirationDate.valueOf(),
			});
		} catch (e) {
			result = e;
		}

		expect(discordMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`Email "${email}" is already linked to an user`],
		});
	});

	it("should fail because duplicated discordUserId", async () => {
		discordMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (discord_user_id)=(${discordUserId}) already exists.`,
			table: "discords",
		});

		let result;

		try {
			result = await service.createOrLogin({
				username,
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis: discordExpirationDate.valueOf(),
			});
		} catch (e) {
			result = e;
		}

		expect(discordMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`Discord user with ID "${discordUserId}" is already registred`],
		});
	});
});
