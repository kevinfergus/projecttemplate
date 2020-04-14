module.exports = {
	entry: './public/client/app.js',
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
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	}
};
