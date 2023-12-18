/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

// See https://github.com/Microsoft/vscode-azuretools/wiki/webpack for guidance

const process = require("process");
const dev = require("vscode-azureextensiondev");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const DEBUG_WEBPACK = !!process.env.DEBUG_WEBPACK;

const config = dev.getDefaultWebpackConfig({
	projectRoot: __dirname,
	verbosity: DEBUG_WEBPACK ? "debug" : "normal",
	externals: { "./getCoreNodeModule": "commonjs getCoreNodeModule" },
	plugins: [
		// @ts-ignore
		// ignoring because syntax is correct but it is throwing an error
		// https://github.com/webpack-contrib/copy-webpack-plugin/issues/455
		new CopyWebpackPlugin([
			{
				from: "./out/src/utils/getCoreNodeModule.js",
				to: "node_modules",
			},
		]),
	],
});

if (DEBUG_WEBPACK) {
	console.log("Config:", config);
}

module.exports = config;
