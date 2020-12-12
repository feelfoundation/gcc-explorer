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
module.exports = [
	{
		path: 'getPriceTicker',
		service: '',
		params: () => undefined,
	}, {
		path: 'search',
		service: '',
		params: req => req.query.id,
	},
	{
		path: 'unifiedSearch',
		service: '',
		params: req => req.query.q,
	},
	{
		path: 'ui_message',
		service: '',
		params: () => undefined,
	},
];
