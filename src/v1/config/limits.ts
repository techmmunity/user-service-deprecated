export const Limits = {
	ids: {
		uuid: {
			length: 36,
		},
		random: {
			length: 25,
		},
	},
	user: {
		fullName: {
			min: 3,
			max: 121,
		},
		username: {
			min: 3,
			max: 16,
		},
		pin: {
			length: 4,
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
			length: 6,
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
