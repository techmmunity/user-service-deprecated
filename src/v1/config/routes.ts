export const Routes = {
	version: "v1",
	settings: {
		update: "/",
	},
	tutorial: {
		complete: "/",
	},
	user: {
		createLocal: "/local",
		createDiscord: "/discord",
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
