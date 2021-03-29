import * as bcrypt from "bcrypt";

export const verify = (password: string, encryptedPassword: string) =>
	bcrypt.compare(password, encryptedPassword);
