import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
} from "typeorm";

import { EntityType } from "types/entity";

export const ALLOWED_FIELDS_TO_UPDATE = [
	"mentoringListPage",
	"articlesListPage",
	"coursesListPage",
	"forumListPage",
	"jobsListPage",
	"projectsListPage",
	"storeListPage",
] as Array<keyof Omit<TutorialType, "id">>;

@Entity("tutorials")
export class TutorialEntity extends BaseEntity {
	@PrimaryColumn()
	public id: string;

	/**
	 *
	 * True = Should Show Tutorial
	 * False = User Already See This Tutorial Before
	 */

	@Column({
		name: "mentoring_list_page",
		nullable: false,
		default: true,
	})
	public mentoringListPage: boolean;

	@Column({
		name: "articles_list_page",
		nullable: false,
		default: true,
	})
	public articlesListPage: boolean;

	@Column({
		name: "courses_list_page",
		nullable: false,
		default: true,
	})
	public coursesListPage: boolean;

	@Column({
		name: "forum_list_page",
		nullable: false,
		default: true,
	})
	public forumListPage: boolean;

	@Column({
		name: "jobs_list_page",
		nullable: false,
		default: true,
	})
	public jobsListPage: boolean;

	@Column({
		name: "projects_list_page",
		nullable: false,
		default: true,
	})
	public projectsListPage: boolean;

	@Column({
		name: "store_list_page",
		nullable: false,
		default: true,
	})
	public storeListPage: boolean;
}

export type TutorialType = EntityType<TutorialEntity>;

export type TutorialRepository = Repository<TutorialEntity>;

export type TutorialFindMany = FindManyOptions<TutorialEntity>;

export type TutorialFindOne = FindOneOptions<TutorialEntity>;
