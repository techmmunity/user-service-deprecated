export interface GetTutorialDocsParams {
	userId: string;
}

export const doc = ({ userId }: GetTutorialDocsParams) => ({
	userId,
	mentoringListPage: true,
	articlesListPage: true,
	coursesListPage: true,
	forumListPage: true,
	jobsListPage: true,
	projectsListPage: true,
	storeListPage: true,
});
