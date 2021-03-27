export const Routes = {
	version: "v1",
	user: {
		create: "/",
		regenPin: "/:userId",
		verify: "/verify",
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
