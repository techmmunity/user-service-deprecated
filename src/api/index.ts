import { CardModule } from "api/card/card.module";
import { GameficationLogModule } from "api/gamefication-log/gamefication-log.module";
import { GameficationModule } from "api/gamefication/gamefication.module";
import { UserModule } from "api/user/user.module";

export const Api = [
	CardModule,
	GameficationLogModule,
	GameficationModule,
	UserModule,
];
