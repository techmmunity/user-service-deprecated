import { BaseParams } from "api/user/service/types";

type BaseParamsOmited = Omit<BaseParams, "UserRepository" | "DiscordService">;

export interface CreateRelationsParams extends BaseParamsOmited {
	userId: string;
}
