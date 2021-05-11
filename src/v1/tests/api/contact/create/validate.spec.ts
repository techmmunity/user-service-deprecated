import { v4 } from "uuid";
import { CreateParams } from "v1/api/contact/service/create";

import { validate } from "v1/api/contact/service/create/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

describe("ContactService > create > validate", () => {
	const userId = v4();

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
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

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (multiple contacts)", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "foo@bar.com",
					},
					{
						type: ContactTypeEnum.PHONE_NUMBER,
						value: "19999904610",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (multiple emails)", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "foo@bar.com",
					},
					{
						type: ContactTypeEnum.EMAIL,
						value: "foo1@bar.com",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (multiple phones)", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.PHONE_NUMBER,
						value: "19999904610",
					},
					{
						type: ContactTypeEnum.PHONE_NUMBER,
						value: "19999904611",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without userId", async () => {
		let result;

		try {
			await validate({
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "foo@bar.com",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userId is a required field"],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId: "123",
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "foo@bar.com",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid userId type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "foo@bar.com",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"userId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without contacts", async () => {
		let result;

		try {
			await validate({
				userId,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contacts is a required field"],
		});
	});

	it("should throw an error with invalid contacts type", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: 123 as any,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contacts must be a `array` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with an empty contacts array", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contacts field must have at least 1 items"],
		});
	});

	it("should throw an error with an invalid contact type", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [123 as any],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contacts[0] must be a `object` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with an invalid contact.type", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: "123" as any,
						value: "foo@bar.com",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`contacts[0].type must be one of the following values: ${ContactTypeValues().join(
					", ",
				)}`,
			],
		});
	});

	it("should throw an error with an invalid contact.type type", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: 123 as any,
						value: "foo@bar.com",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contacts[0].type must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with an invalid contact.value", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "invalid_email",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contacts[0].value must be a valid email or phone number"],
		});
	});

	it("should throw an error with an invalid contact.value type", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: 123 as any,
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contacts[0].value must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with an invalid contact.value type", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: 123 as any,
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contacts[0].value must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw error with unmatched contact.type and contact.value", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.PHONE_NUMBER,
						value: "foo@bar.com",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["contacts[0].value must be a valid phone number"],
		});
	});

	it("should throw error with unmatched contact.type and contact.value", async () => {
		let result;

		try {
			await validate({
				userId,
				contacts: [
					{
						type: ContactTypeEnum.EMAIL,
						value: "19999904610",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toStrictEqual({
			errors: ["contacts[0].value must be a valid email"],
		});
	});
});
