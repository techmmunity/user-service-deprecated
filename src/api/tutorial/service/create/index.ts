import { typeValidation } from "./validation/type-validation";

import { TutorialRepository, TutorialType } from "api/tutorial/tutorial.entity";

interface Injectable {
	TutorialRepository: TutorialRepository;
}

export interface CreateParams {
	userId: string;
}

export const create = (params: CreateParams & Injectable) => {
	typeValidation(params);

	const { TutorialRepository, userId } = params;

	return TutorialRepository.save<TutorialType>({
		userId,
		mentoringListPage: true,
		articlesListPage: true,
		coursesListPage: true,
		forumListPage: true,
		jobsListPage: true,
		projectsListPage: true,
		storeListPage: true,
	});
};
