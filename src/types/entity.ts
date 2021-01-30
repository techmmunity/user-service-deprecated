export type EntityType<T> = Omit<
	T,
	| "_id"
	| "reload"
	| "recover"
	| "softRemove"
	| "remove"
	| "save"
	| "hasId"
	| "createdAt"
	| "updatedAt"
>;
