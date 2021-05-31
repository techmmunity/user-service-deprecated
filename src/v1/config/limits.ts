export const LIMITS = {
	ids: {
		uuid: {
			length: 36,
		},
		discordSnowflake: {
			length: 18,
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
	linkedin: {
		username: {
			max: 100,
		},
	},
	confirmationToken: {
		token: {
			length: 6,
		},
	},
};
