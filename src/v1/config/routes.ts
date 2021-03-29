export const Routes = {
	version: "v1",
	user: {
		createLocal: "/create-local",
		loginLocal: "/login-local",
		regenPin: "/regen-pin/:userId",
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
