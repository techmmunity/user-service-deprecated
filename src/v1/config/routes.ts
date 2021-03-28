export const Routes = {
	version: "v1",
	user: {
		createLocal: "/local",
		loginLocal: "/login",
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
