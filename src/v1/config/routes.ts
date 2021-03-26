export const Routes = {
	version: "v1",
	user: {
		create: "/",
		findById: "/:id",
		regenPin: "/:id",
	},
	contact: {
		create: "/",
	},
	userToken: {
		update: "/",
	},
	verifyAccount: {
		verify: "/:confirmationCode",
	},
};
