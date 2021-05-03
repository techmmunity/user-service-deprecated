export interface MockRepository {
	find: jest.Mock<any, any>;
	findOne: jest.Mock<any, any>;
	findAndCount: jest.Mock<any, any>;
	findByIds: jest.Mock<any, any>;
	save: jest.Mock<any, any>;
	insert: jest.Mock<any, any>;
	update: jest.Mock<any, any>;
	query: jest.Mock<any, any>;
	delete: jest.Mock<any, any>;
	count: jest.Mock<any, any>;
	increment: jest.Mock<any, any>;
}

export const makeMockRepository = (): MockRepository => ({
	find: jest.fn(),
	findOne: jest.fn(),
	findAndCount: jest.fn(),
	findByIds: jest.fn(),
	save: jest.fn(),
	insert: jest.fn(),
	update: jest.fn(),
	query: jest.fn(),
	delete: jest.fn(),
	count: jest.fn(),
	increment: jest.fn(),
});
