import { CompleteParams } from "api/tutorial/service/complete";
import { v4 } from "uuid";

import { validate } from "api/tutorial/service/complete/validation";

import { ALLOWED_FIELDS_TO_UPDATE } from "api/tutorial/tutorial.entity";

import { InvalidParamsErrorMessage } from "utils/yup";

const userId = v4();

const ALLOWED_FIELDS_MESSAGE = `field must be one of the following values: ${ALLOWED_FIELDS_TO_UPDATE.join(
	", ",
)}`;

describe("TutorialService > complete > validation", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await Promise.all([
				ALLOWED_FIELDS_TO_UPDATE.map(field =>
					validate({
						userId,
						field,
					}),
				),
			]);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error with no userId", async () => {
		let result;

		try {
			await validate({
				field: "articlesListPage",
			} as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["userId is a required field"],
		});
	});

	it("should throw an error without field", async () => {
		let result;

		try {
			await validate({ userId } as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["field is a required field"],
		});
	});

	it("should throw an error with invalid userId type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
				field: "articlesListPage",
			} as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"userId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId: "123",
				field: "articlesListPage",
			} as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid field type", async () => {
		let result;

		try {
			await validate({
				userId,
				field: 123 as any,
			} as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"field must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId,
				field: "123" as any,
			} as CompleteParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [ALLOWED_FIELDS_MESSAGE],
		});
	});
});
