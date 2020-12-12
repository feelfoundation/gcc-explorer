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
import AppFilters from './filters.module';

AppFilters.filter('alterWordSeparation', () => {
	const trim = str => str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	const types = {
		dashSeparated: {
			reg: /\s/g,
			alternate: '-',
		},
		spaceSeparated: {
			reg: /-/g,
			alternate: ' ',
		},
	};
	return (phrase, type) => {
		if (type in types) {
			return trim(phrase).replace(types[type].reg, types[type].alternate);
		}
		return false;
	};
});