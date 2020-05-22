// Plugins
import { terser } from 'rollup-plugin-terser';
// import browsersync from 'rollup-plugin-browsersync';

import pkg from './package.json';

const prod = process.argv.slice(3, 0) === 'prod';

const file = pkg.main.split('/')[2];
const polyfill = file.split('.')[0] + '.polyfills.js';

// Configs
var configs = {
	name: pkg.name,
	files: [file, polyfill],
	formats: ['umd'],
	default: 'umd',
	pathIn: 'src',
	pathOut: 'dist',
	minify: prod,
};

var browsersyncConfig = {
	server: './dist',
	files: ['./src/**/*.js', './src/*.js'],
	logLevel: 'debug',
};

// Banner
// prettier-ignore
var banner = `/*! ${configs.name ? configs.name : pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author.name} | ${pkg.license} License | ${pkg.repository.url} */`;

var createOutput = function (filename, minify) {
	return configs.formats.map(output);

	function output(format) {
		var output = {
			// prettier-ignore
			file: `${configs.pathOut}/${filename}${format === configs.default ? '' : `.${format}`}${minify ? '.min' : ''}.js`,
			format: format,
			banner: banner,
		};
		if (format === 'iife' || format === 'umd') {
			output.name = configs.name ? configs.name : pkg.name;
		}
		if (minify) {
			output.plugins = [terser()];
		}
		return output;
	}
};

/**
 * Create output formats
 * @param  {String} filename The filename
 * @return {Array}           The outputs array
 */
var createOutputs = function (filename) {
	// Create base outputs
	var outputs = createOutput(filename);

	// If not minifying, return outputs
	if (!configs.minify) return outputs;

	// Otherwise, ceate second set of outputs
	var outputsMin = createOutput(filename, true);

	// Merge and return the two arrays
	return outputs.concat(outputsMin);
};

/**
 * Create export object
 * @return {Array} The export object
 */
var createExport = function () {
	const exports = configs.files.map(format);

	return exports;

	function format(file, i) {
		var filename = file.replace('.js', '');
		const formattedExport = {
			input: `${configs.pathIn}/${file}`,
			output: createOutputs(filename),
		};
		/*
        if (!i && !configs.minify)
			formattedExport.plugins = [browsersync(browsersyncConfig)];
		console.log(formattedExport);*/
		return formattedExport;
	}
};

export default createExport();
