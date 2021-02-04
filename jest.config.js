module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	coveragePathIgnorePatterns: [
		"node_modules",
		".module.",
		".controller.",
		".entity.",
		"core/",
		"config/",
		"types/",
		"main.(t|j)s",
		"api/index.(t|j)s",
	],
	collectCoverageFrom: ["**/*.(t|j)s"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	moduleDirectories: ["node_modules", "src"],
};
