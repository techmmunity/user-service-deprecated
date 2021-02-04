export interface MockRepository {
	find: jest.Mock<any, any>;
	findOne: jest.Mock<any, any>;
	save: jest.Mock<any, any>;
	insert: jest.Mock<any, any>;
	update: jest.Mock<any, any>;
}

export const mameMockRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	save: jest.fn(),
	insert: jest.fn(),
	update: jest.fn(),
});
