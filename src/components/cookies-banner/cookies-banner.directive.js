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
import CookiesBanner from './cookies-banner.module';
import template from './cookies-banner.html';

const directiveCtrl = ($scope, $cookies) => {
	$scope.visible = true;
	const cookieKey = 'cookiesBannerConfirmed';

	// setting the expiredate to 2years ahead
	const expireDate = new Date();
	const expireDays = 365 * 2;
	expireDate.setDate(expireDate.getDate() + expireDays);

	$scope.clicked = () => {
		$scope.visible = false;
		$cookies.put(cookieKey, 'true', { expires: expireDate });
	};

	const result = $cookies.get(cookieKey);
	if (result === 'true') $scope.visible = false;
};

// eslint-disable-next-line arrow-body-style
CookiesBanner.directive('cookiesBanner', () => {
	return {
		restrict: 'E',
		replace: true,
		scope: true,
		template,
		controller: directiveCtrl,
		controllerAs: 'vm',
	};
});
