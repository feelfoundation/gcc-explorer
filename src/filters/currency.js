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

AppFilters.filter('currency', (numberFilter, feelFilter, fiatFilter, isFiat) => (amount, currency, decimalPlacesCrypto, decimalPlacesFiat) => {
	if (Number(amount) === 0) return 0;

	let factor = 1;
	let equivalent = false;

	if (currency.tickers && currency.tickers.GCC && currency.tickers.GCC[currency.symbol]) {
		factor = currency.tickers.GCC[currency.symbol];
	} else if (currency.symbol !== 'GCC') {
		// Exchange rate not available for current symbol
		return 'N/A';
	}

	if (isFiat(currency)) {
		amount = fiatFilter(amount);
		if (typeof decimalPlacesFiat !== 'number') decimalPlacesFiat = 2;
		return `~${numberFilter(amount * factor, decimalPlacesFiat)}`;
	}

	amount = feelFilter(amount);

	if (typeof decimalPlacesCrypto === 'undefined') {
		amount = numberFilter((amount * factor), 8).replace(/\.?0+$/, '');
		return factor === 1 ? amount : `~${amount}`;
	}

	if (currency.symbol === 'GCC') {
		equivalent = Number(amount) === Number(numberFilter((amount * factor), decimalPlacesCrypto));
	}

	amount = numberFilter((amount * factor), decimalPlacesCrypto);
	return (factor !== 1 || decimalPlacesCrypto !== 8) && !equivalent ? `~${amount}` : amount;
});
