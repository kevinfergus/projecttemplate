module.exports = {
	entry: [ 'babel-polyfill', './client/index.js' ],
	mode: 'development',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
