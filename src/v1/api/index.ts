import { UserTokenModule } from "v1/api/user-token/user-token.module";
import { UserModule } from "v1/api/user/user.module";
import { VerifyAccountModule } from "v1/api/verify-account/verify-account.module";

export const Api = [UserTokenModule, UserModule, VerifyAccountModule];
