export interface MockRepository {
	find: jest.Mock<any, any>;
	findOne: jest.Mock<any, any>;
	save: jest.Mock<any, any>;
	insert: jest.Mock<any, any>;
	update: jest.Mock<any, any>;
}

export const makeMockRepository = () => {
	const mock = {
		find: jest.fn(),
		findOne: jest.fn(),
		save: jest.fn(),
		insert: jest.fn(),
		update: jest.fn(),
	};

	const resetMock = () => {
		mock.find.mockReset();
		mock.findOne.mockReset();
		mock.save.mockReset();
		mock.insert.mockReset();
		mock.update.mockReset();
	};

	return {
		resetMock,
		...mock,
	};
};
