'use strict';

const sharp = require('sharp');
const createPlugin = require('@zebrajaeger/gulp-scale-images');
const {SCALE_INFO, DEFAULT_COMPUTE_FILENAME} = createPlugin;

const resizeSharp = (file, cfg, cb) => {
	const task = sharp(file.contents);

	task.resize({
		width: cfg.maxWidth,
		height: cfg.maxHeight || null,
		fit: "inside",
		withoutEnlargement: !cfg.allowEnlargement
	});

	if (cfg.format) {
		task.toFormat(cfg.format, cfg);
	}

	task.toBuffer((err, data, info) => {
		if (err) {
			return cb(err);
		}

		const newFile = file.clone({contents: false});
		newFile.contents = data;
		Object.defineProperty(newFile, SCALE_INFO, {value: info});

		cb(null, newFile)
	});
};

module.exports = resizeSharp;
