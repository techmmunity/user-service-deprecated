import { ConfirmationTokenModule } from "./confirmation-token/confirmation-token.module";
import { ContactModule } from "./contact/contact.module";
import { DiscordModule } from "./discord/discord.module";
import { HealthModule } from "./health/health.module";
import { UserModule } from "v1/api/user/user.module";

export const Api = [
	ConfirmationTokenModule,
	ContactModule,
	DiscordModule,
	HealthModule,
	UserModule,
];
