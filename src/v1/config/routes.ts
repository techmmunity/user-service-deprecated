export const Routes = {
	version: "v1",
	user: {
		create: "/",
		findById: "/:id",
		regenPin: "/:id",
	},
	userToken: {
		update: "/",
	},
	verifyAccount: {
		verify: "/:confirmationCode",
	},
};
