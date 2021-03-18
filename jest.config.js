module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	collectCoverageFrom: [
		"api/**/*.service.ts",
		"api/**/service/**/*.ts",
		"api/**/service/**/**/*.ts",
	],
	setupFiles: ["./tests/setup.ts"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	moduleDirectories: ["node_modules", "src"],
	// coverageThreshold: {
	// 	global: {
	// 		branches: 100,
	// 		functions: 100,
	// 		lines: 100,
	// 		statements: 100,
	// 	},
	// },
};
