import * as bcrypt from "bcrypt";

export const encrypt = (password: string) => bcrypt.hashSync(password, 10);
