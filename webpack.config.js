module.exports = {
	watch: true,
	development: true,
	entry: "./main.js",
	output: {
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
};