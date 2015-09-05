module.exports = {
	watch: true,
	development: true,
	entry: "./src/main.js",
	output: {
		filename: "./src/bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js/,
			exclude: /node_modules/,
			loader: "babel-loader"
		},
		{
			test: /\.css/,
			exclude: /node_modules/,
			loader: "style-loader!css-loader"
		}]
	}
};