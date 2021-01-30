import { HeadlineModule } from "api/headline/headline.module";
import { InterestsModule } from "api/interests/interests.module";
import { SettingsModule } from "api/settings/settings.module";
import { TutorialModule } from "api/tutorial/tutorial.module";
import { UserInterestsModule } from "api/user-interests/user-interests.module";
import { UserTokenModule } from "api/user-token/user-token.module";
import { UserModule } from "api/user/user.module";
import { VerifyAccountModule } from "api/verify-account/verify-account.module";

export const Api = [
	HeadlineModule,
	InterestsModule,
	SettingsModule,
	TutorialModule,
	UserInterestsModule,
	UserTokenModule,
	UserModule,
	VerifyAccountModule,
];
