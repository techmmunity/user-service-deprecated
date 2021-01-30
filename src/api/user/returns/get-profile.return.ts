import { ObjectType } from "@nestjs/graphql";

import { UserEntity } from "../entities/user.entity";
import { GameficationEntity } from "api/gamefication/entities/gamefication.entity";

@ObjectType()
export class GetProfileReturn {
	public readonly user: UserEntity;
	public readonly gamefication: GameficationEntity;
}
