import { validate } from "./validation";

import { TutorialRepository, TutorialType } from "api/tutorial/tutorial.entity";

interface Injectable {
	TutorialRepository: TutorialRepository;
}

export interface CreateParams {
	userId: string;
}

export const create = async (params: CreateParams & Injectable) => {
	await validate(params);

	const { TutorialRepository, userId } = params;

	return TutorialRepository.save<TutorialType>({
		id: userId,
		mentoringListPage: true,
		articlesListPage: true,
		coursesListPage: true,
		forumListPage: true,
		jobsListPage: true,
		projectsListPage: true,
		storeListPage: true,
	});
};
