delete process.env.TS_NODE_PROJECT;
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV == 'production';
const config = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
		],
	},
	plugins: [new Dotenv()],
	resolve: {
		extensions: ['.ts', '.js', '...'],
		plugins: [
			new TsconfigPathsPlugin({
				baseUrl: './src',
				extensions: ['.ts'],
			}),
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};
