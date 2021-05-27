import { PgErrorEnum } from "@techmmunity/database-error-handler";
import * as moment from "moment";
import { v4 } from "uuid";

import { UserService } from "v1/api/user/user.service";

import { ContactTypeEnum } from "core/enums/contact-type";

import { ContactMock } from "v1/tests/mocks/contact";
import { DiscordMock } from "v1/tests/mocks/discord";
import { UserMock } from "v1/tests/mocks/user";

describe("UserService > create > discord", () => {
	let service: UserService;

	const userId = v4();
	const username = "foo_bar";
	const email = "foo@bar.com";
	const discordUserId = "308994132968210433";
	const discordAccessToken = "3bcrVOWjlrzlJWu240yODtJRHcZB1l";
	const discordRefreshToken = "CZhtkLDpNYXgPH9Ml6shqh2OwykChw";
	const discordExpirationDate = moment().add(3, "days");

	beforeAll(async () => {
		service = await UserMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create user with valid params", async () => {
		const userDoc = UserMock.doc({
			id: userId,
			username,
		});
		const contactDoc = ContactMock.doc({
			userId: userId,
			type: ContactTypeEnum.EMAIL,
			value: email,
			primary: true,
		});
		const discordDoc = DiscordMock.doc({
			userId,
			discordUserId,
			discordAccessToken,
			discordRefreshToken,
			discordExpirationDate: discordExpirationDate.toDate(),
		});

		UserMock.repository.save.mockResolvedValue({
			...userDoc,
			contacts: [contactDoc],
			discord: discordDoc,
		});

		let result;

		try {
			result = await service.createDiscord({
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

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(result).toHaveProperty("userId");
		expect(result).toHaveProperty("pin");
		expect(result.userId).toBe(userId);
		expect(typeof result.pin).toBe("string");
		expect(result.pin.length).toBe(4);
		expect(/^\d+$/.test(result.pin)).toBeTruthy();
	});

	it("should fail because duplicated username", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (username)=(${username}) already exists.`,
			table: "users",
		});

		let result;

		try {
			result = await service.createDiscord({
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

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`User with username "${username}" already exists`],
		});
	});

	it("should fail because duplicated email", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (value)=(${email}) already exists.`,
			table: "contacts",
		});

		let result;

		try {
			result = await service.createDiscord({
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

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`Email "${email}" is already linked to an user`],
		});
	});

	it("should fail because duplicated discordUserId", async () => {
		UserMock.repository.save.mockRejectedValue({
			code: PgErrorEnum.UniqueViolation,
			detail: `Key (discord_user_id)=(${discordUserId}) already exists.`,
			table: "discords",
		});

		let result;

		try {
			result = await service.createDiscord({
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

		expect(UserMock.repository.save).toBeCalledTimes(1);
		expect(result.response).toStrictEqual({
			errors: [`Discord user with ID "${discordUserId}" is already registred`],
		});
	});
});
