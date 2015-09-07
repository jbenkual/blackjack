module.exports = {
	watch: true,
	development: true,
	entry: "./src/js/main.js",
	output: {
		filename: "./js/bundle.js",
		path: "./src"
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
		},
		{ 
			test: /\.(png|jpg|jpeg|gif|woff)$/,
			exclude: /node_modules/,
			loader: 'url-loader?limit=8192' 
		}]
	}
};