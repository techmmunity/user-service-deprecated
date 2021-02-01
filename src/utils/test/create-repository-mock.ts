export const createRepositoryMock = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	insert: jest.fn(),
	update: jest.fn(),
});
