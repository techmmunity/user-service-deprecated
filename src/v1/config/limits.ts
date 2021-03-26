export const Limits = {
	ids: {
		uuid: {
			min: 36,
			max: 36,
		},
		random: {
			max: 25,
		},
	},
	user: {
		name: {
			min: 3,
			max: 60,
		},
		surnames: {
			min: 3,
			max: 60,
		},
		email: {
			min: 5,
			max: 50,
		},
		username: {
			min: 3,
			max: 16,
		},
		pin: {
			min: 4,
			max: 4,
		},
		avatar: {
			max: 150,
		},
		youtube: {
			max: 100,
		},
	},
	verifyAccount: {
		code: {
			max: 6,
		},
	},
	github: {
		username: {
			max: 100,
		},
	},
	discord: {
		username: {
			max: 100,
		},
	},
	linkedin: {
		username: {
			max: 100,
		},
	},
};
