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

@Entity("tutorials")
export class TutorialEntity extends BaseEntity {
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public mentoringListPage: boolean;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public articlesListPage: boolean;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public coursesListPage: boolean;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public forumListPage: boolean;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public jobsListPage: boolean;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public projectsListPage: boolean;

	@Column() // True = Should Show Tutorial / False = User Already See This Tutorial Before
	public storeListPage: boolean;
}

export type TutorialType = EntityType<TutorialEntity>;

export type TutorialRepository = Repository<TutorialEntity>;

export type TutorialFindMany = FindManyOptions<TutorialEntity>;

export type TutorialFindOne = FindOneOptions<TutorialEntity>;
