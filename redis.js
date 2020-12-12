/*
 * feelfoundation/gcc-explorer
 * Copyright © 2018 Feel Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Feel Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
const redis = require('redis');
const logger = require('./utils/logger');

module.exports = function (config) {
	const client = redis.createClient(
		config.redis.port,
		config.redis.host,
		{ db: config.redis.db });

	if (config.redis.password) {
		client.auth(config.redis.password, (err) => {
			if (err) {
				logger.error(`Can't connect to redis: ${err}`);
			}
		});
	}

	client.on('connect', () => {
		logger.info(`Redis: Connected to ${config.redis.host}:${config.redis.port}`);
	});

	client.on('error', (err) => {
		logger.error(`Redis: ${err.message}`);
	});

	client.on('reconnecting', () => {
		logger.warn('Redis: reconnecting...');
	});

	return client;
};
