import { SettingsModule } from "api/settings/settings.module";
import { TutorialModule } from "api/tutorial/tutorial.module";
import { UserTokenModule } from "api/user-token/user-token.module";
import { UserModule } from "api/user/user.module";
import { VerifyAccountModule } from "api/verify-account/verify-account.module";

export const Api = [
	SettingsModule,
	TutorialModule,
	UserTokenModule,
	UserModule,
	VerifyAccountModule,
];
