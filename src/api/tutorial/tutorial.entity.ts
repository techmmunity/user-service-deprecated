import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ObjectIdColumn,
	ObjectID,
	Repository,
	FindManyOptions,
	FindOneOptions,
} from "typeorm";

import { EntityType } from "types/entity";

@ObjectType()
@Entity("tutorials")
export class TutorialEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public mentoringListPage?: boolean;

	@Column()
	public articlesListPage?: boolean;

	@Column()
	public coursesListPage?: boolean;

	@Column()
	public forumListPage?: boolean;

	@Column()
	public jobsListPage?: boolean;

	@Column()
	public projectsListPage?: boolean;

	@Column()
	public storeListPage?: boolean;
}

export type TutorialType = EntityType<TutorialEntity>;

export type TutorialRepository = Repository<TutorialEntity>;

export type TutorialFindMany = FindManyOptions<TutorialEntity>;

export type TutorialFindOne = FindOneOptions<TutorialEntity>;
