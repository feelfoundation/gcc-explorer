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
import App from './app';

App.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$stateProvider
		.state('home', {
			url: '/',
			parentDir: 'home',
			component: 'home',
		})
		.state('blocks', {
			url: '/blocks/:page',
			parentDir: 'home',
			component: 'blocks',
		})
		.state('block', {
			url: '/block/:blockId?page&sort',
			parentDir: 'home',
			component: 'block',
		})
		.state('transactions', {
			url: '/txs/:page?address&senderId&senderPublicKey&recipientId&recipientPublicKey&minAmount&maxAmount&type&height&blockId&fromTimestamp&toTimestamp&sort',
			parentDir: 'home',
			component: 'transactions',
		})
		.state('transaction', {
			url: '/tx/:txId',
			parentDir: 'home',
			component: 'transaction',
		})
		.state('address', {
			url: '/address/:address?page&senderId&senderPublicKey&recipientId&recipientPublicKey&minAmount&maxAmount&type&height&blockId&fromTimestamp&toTimestamp&sort',
			parentDir: 'home',
			component: 'address',
		})
		.state('activity-graph', {
			url: '/activityGraph',
			parentDir: 'home',
			component: 'activityGraph',
		})
		.state('top-accounts', {
			url: '/topAccounts',
			parentDir: 'home',
			component: 'topAccounts',
		})
		.state('delegate-monitor', {
			url: '/delegateMonitor',
			parentDir: 'home',
			component: 'delegateMonitor',
		})
		.state('market-watcher', {
			url: '/marketWatcher',
			parentDir: 'home',
			component: 'marketWatcher',
		})
		.state('network-monitor', {
			url: '/networkMonitor',
			parentDir: 'home',
			component: 'networkMonitor',
		})
		.state('delegate', {
			url: '/delegate/:delegateId',
			parentDir: 'home',
			component: 'delegate',
		})
		.state('error', {
			url: '/404',
			parentDir: 'home',
			component: 'c404',
		});
	$urlRouterProvider.otherwise('/404');
	$locationProvider.html5Mode(true);
	$urlRouterProvider.rule(($injector, $location) => {
		const path = $location.path();
		const hasTrailingSlash = path[path.length - 1] === '/';
		const hasTargetUrl = path === '/block' || path === '/blocks' || path === '/txs';
		if (hasTargetUrl && !hasTrailingSlash) {
			// if the target url doesn't have '/' at last, adds '/'
			const newPath = path.concat('/');
			return newPath;
		}
		return undefined;
	});
});
