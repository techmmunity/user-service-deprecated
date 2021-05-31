/* eslint-disable @typescript-eslint/naming-convention */

jest.mock("typeorm-transactional-cls-hooked", () => ({
	Transactional: () => () => ({}),
	BaseRepository: class {},
}));
