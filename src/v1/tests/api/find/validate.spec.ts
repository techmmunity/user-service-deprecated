import { v4 } from "uuid";
import { FindParams } from "v1/api/user/service/find";

import { validate } from "v1/api/user/service/find/validate";

import { invalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > find > validate", () => {
	const id = v4();
	const email = "foo@bar.com";
	const username = "foo_bar";
	const phone = "foo_bar";

	it("should do nothing with valid params (id)", async () => {
		let result;

		try {
			await validate({
				identifier: id,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (email)", async () => {
		let result;

		try {
			await validate({
				identifier: email,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (username)", async () => {
		let result;

		try {
			await validate({
				identifier: username,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (phone)", async () => {
		let result;

		try {
			await validate({
				identifier: phone,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as unknown as FindParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [invalidParamsErrorMessage],
		});
	});

	it("should throw an error without identifier", async () => {
		let result;

		try {
			await validate({} as FindParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["identifier is a required field"],
		});
	});

	it("should throw an error with invalid identifier type", async () => {
		let result;

		try {
			await validate({
				identifier: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"identifier must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
