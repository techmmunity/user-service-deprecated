import { errorUtil } from "v1/utils/error";
import { passwordUtil } from "v1/utils/password";

interface VerifyPasswordParams {
	password: string;
	passwordHash: string;
}

export const verifyPassword = async ({
	password,
	passwordHash,
}: VerifyPasswordParams) => {
	const isValidPassword = await passwordUtil.verify(password, passwordHash);

	if (!isValidPassword) {
		return errorUtil.badRequest(["Invalid username, email or password"]);
	}
};
