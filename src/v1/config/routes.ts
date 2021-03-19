export const Routes = {
	version: "v1",
	settings: {
		update: "/",
	},
	termsAndPolicies: {
		accept: "/",
		hasAccepted: "/:application/:userId/:version",
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
