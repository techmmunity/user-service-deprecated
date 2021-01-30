import { ObjectType } from "@nestjs/graphql";

import { UserEntity } from "../user.entity";
import { GameficationEntity } from "api/gamefication/gamefication.entity";

@ObjectType()
export class GetProfileReturn {
	public readonly user: UserEntity;
	public readonly gamefication: GameficationEntity;
}
