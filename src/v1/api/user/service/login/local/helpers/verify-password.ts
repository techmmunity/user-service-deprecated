import { ErrorUtil } from "v1/utils/error";
import { PasswordUtil } from "v1/utils/password";

interface VerifyPasswordParams {
	password: string;
	passwordHash: string;
}

export const verifyPassword = async ({
	password,
	passwordHash,
}: VerifyPasswordParams) => {
	const isValidPassword = await PasswordUtil.verify(password, passwordHash);

	if (!isValidPassword) {
		return ErrorUtil.badRequest(["Invalid username, email or password"]);
	}
};
