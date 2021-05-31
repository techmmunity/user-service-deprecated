import { v4 } from "uuid";
import { CreateParams } from "v1/api/confirmation-token/service/create";

import { validate } from "v1/api/confirmation-token/service/create/validate";

import { invalidParamsErrorMessage } from "v1/utils/yup";

import {
	ConfirmationTokenTypeEnum,
	ConfirmationTokenTypeValues,
} from "core/enums/confirmation-token-type";

describe("ConfirmationTokenService > create > validate", () => {
	const userId = v4();
	const contactId = v4();

	it("should do nothing with valid params (with contactId)", async () => {
		let result;

		try {
			await validate({
				contactId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with userId)", async () => {
		let result;

		try {
			await validate({
				userId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as unknown as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [invalidParamsErrorMessage],
		});
	});

	it("should throw an error with userId and contactId", async () => {
		let result;

		try {
			await validate({
				userId,
				contactId,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["Only userId OR contactId should be provided"],
		});
	});

	it("should throw an error without userId and contactId", async () => {
		let result;

		try {
			await validate({
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userId or contactId must be provided"],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId: "123",
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
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
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
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

	it("should throw an error with invalid contactId", async () => {
		let result;

		try {
			await validate({
				contactId: "123",
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contactId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid contactId type", async () => {
		let result;

		try {
			await validate({
				contactId: 123 as any,
				type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contactId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without type", async () => {
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
			errors: ["type is a required field"],
		});
	});

	it("should throw an error with an invalid type", async () => {
		let result;

		try {
			await validate({
				userId,
				type: "123" as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`type must be one of the following values: ${ConfirmationTokenTypeValues().join(
					", ",
				)}`,
			],
		});
	});

	it("should throw an error with an invalid type type", async () => {
		let result;

		try {
			await validate({
				userId,
				type: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["type must be a `string` type, but the final value was: `123`."],
		});
	});
});
