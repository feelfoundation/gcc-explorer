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
import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-gettext';
import 'angular-sanitize';
import 'angular-cookies';

// styles
import 'amstock3/amcharts/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import '../assets/styles/common.css';
import '../assets/styles/flags.css';
import '../assets/styles/tableMobile.css';

// submodules
import '../components/blocks';
import '../components/address';
import '../components/transactions';
import '../components/delegate';
import '../components/delegate-monitor';
import '../components/top-accounts';
import '../components/search';
import '../components/header';
import '../components/footer';
import '../components/currency-selector';
import '../components/navigation-dropdown';
import '../components/rounding-selector';
import '../components/activity-graph';
import '../components/home';
import '../components/bread-crumb';
import '../components/market-watcher';
import '../components/network-monitor';
import '../components/information-banner';
import '../components/cookies-banner';
import '../components/404';


import '../filters';
import '../services';
import '../directives';
import './app-tools.module';
import '../shared';

const App = angular.module('feel_explorer', [
	'ngAnimate',
	'ngResource',
	'ngSanitize',
	'ngCookies',
	'ui.router',
	'ui.bootstrap',
	'gettext',
	'feel_explorer.breadCrumb',
	'feel_explorer.filters',
	'feel_explorer.services',
	'feel_explorer.header',
	'feel_explorer.footer',
	'feel_explorer.blocks',
	'feel_explorer.transactions',
	'feel_explorer.address',
	'feel_explorer.delegate',
	'feel_explorer.topAccounts',
	'feel_explorer.search',
	'feel_explorer.tools',
	'feel_explorer.currency',
	'feel_explorer.navDropdown',
	'feel_explorer.roundingMenu',
	'feel_explorer.activityGraph',
	'feel_explorer.delegateMonitor',
	'feel_explorer.home',
	'feel_explorer.networkMonitor',
	'feel_explorer.marketWatcher',
	'feel_explorer.infoBanner',
	'feel_explorer.cookiesBanner',
	'feel_explorer.404',
]);

export default App;
