const fs = require("fs");
const path = require("path");

const getFile = () =>
	fs.readFileSync(path.resolve(__dirname, "..", "TODO.md"), {
		encoding: "utf-8",
	});

const getDone = (file) => file.match(/^- \[x\]/gm).length;

const getTodo = (file) => file.match(/^- \[ \]/gm).length;

const countTodo = () => {
	const file = getFile().split("# Todo Upgrades")[0];

	const todo = getTodo(file);
	const done = getDone(file);

	console.log("");
	console.log("Todo:", "\x1b[36m", todo);
	console.log("Done:", "\x1b[36m", done);
	console.log("Total:", "\x1b[36m", todo + done);
	console.log("");
};

countTodo();
