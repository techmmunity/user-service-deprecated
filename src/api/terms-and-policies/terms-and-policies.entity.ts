import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryGeneratedColumn,
} from "typeorm";

import { EntityType } from "types/entity";

@Entity("terms_and_policies")
export class TermsAndPoliciesEntity extends BaseEntity {
	@PrimaryGeneratedColumn({
		type: "uuid",
		comment: "Canno't be the userId, because many versions can be accepted",
	})
	public id: string;

	@Column({
		name: "user_id",
		nullable: false,
	})
	public userId: string;

	// TODO When we have more apps, like resumer or kanban, uncomment
	// @Column({
	// 	type: "enum",
	// 	nullable: false,
	// 	enum: AppsValues(),
	// })
	// public app: AppsEnum;

	@Column({
		nullable: false,
	})
	public version: number;
}

export type TermsAndPoliciesType = EntityType<TermsAndPoliciesEntity>;

export type TermsAndPoliciesRepository = Repository<TermsAndPoliciesEntity>;

export type TermsAndPoliciesFindMany = FindManyOptions<TermsAndPoliciesEntity>;

export type TermsAndPoliciesFindOne = FindOneOptions<TermsAndPoliciesEntity>;
