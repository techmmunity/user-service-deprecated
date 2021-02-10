import { SettingsModule } from "api/settings/settings.module";
import { TermsAndPoliciesModule } from "api/terms-and-policies/terms-and-policies.module";
import { TutorialModule } from "api/tutorial/tutorial.module";
import { UserTokenModule } from "api/user-token/user-token.module";
import { UserModule } from "api/user/user.module";
import { VerifyAccountModule } from "api/verify-account/verify-account.module";

export const Api = [
	SettingsModule,
	TermsAndPoliciesModule,
	TutorialModule,
	UserTokenModule,
	UserModule,
	VerifyAccountModule,
];
