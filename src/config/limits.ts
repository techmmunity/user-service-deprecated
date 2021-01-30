export const LimitsConfig = {
	article: {
		contentLength: {
			min: 500,
			max: 20000,
		},
		titleLength: {
			min: 10,
			max: 100,
		},
		tagsQtd: {
			min: 3,
			max: 20,
		},
	},

	articleQuestion: {
		qtd: {
			min: 0,
			max: 5,
		},

		titleLength: {
			min: 10,
			max: 50,
		},

		tipLength: {
			min: 1,
			max: 150,
		},

		multipleChoice: {
			descriptionLength: {
				min: 10,
				max: 500,
			},
			alternatives: {
				qtd: {
					min: 3,
					max: 5,
				},
				length: {
					min: 1,
					max: 100,
				},
			},
		},

		exactText: {
			correctAnswerLength: {
				min: 1,
				max: 25,
			},
		},
	},

	discord: {
		avatarDimentions: {
			min: 16,
			max: 4096,
		},
	},
};
