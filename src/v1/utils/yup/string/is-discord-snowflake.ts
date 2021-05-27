import { Yup } from "..";

export const isDiscordSnowflake = (yup: Yup) => {
	yup.addMethod(yup.string, "isDiscordSnowflake", function () {
		return this.test({
			name: "isDiscordSnowflake",
			message: "${path} must be a valid discord snowflake",
			test: snowflake => {
				if (!snowflake) return true;

				if (snowflake.length !== 18) return false;

				return /^\d+$/.test(snowflake);
			},
		});
	});
};
