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
import AppBlocks from './blocks.module';
import template from './block.html';

const BlockConstructor = function ($rootScope, $state, $stateParams, $location, $http, genericTxs) {
	const vm = this;
	vm.getLastBlocks = (n) => {
		let offset = 0;

		if (n) {
			offset = (n - 1) * 20;
		}

		$http.get(`/api/getLastBlocks?n=${offset}`).then((resp) => {
			if (resp.data.success) {
				vm.blocks = resp.data.blocks;

				if (resp.data.pagination) {
					vm.pagination = resp.data.pagination;
				}
			} else {
				vm.blocks = [];
			}
		});
	};

	vm.getBlock = (blockId) => {
		$http.get('/api/getBlock', {
			params: {
				blockId,
			},
		}).then((resp) => {
			if (resp.data.success) {
				vm.block = resp.data.block;
			} else {
				throw new Error('Block was not found!');
			}
		}).catch(() => {
			$location.path('/');
		});
	};

	vm.loadPageOffset = (offset) => {
		$state.go($state.current.component, { page: Number(vm.txs.page || 1) + offset });
	};

	vm.loadPage = (pageNumber) => {
		$state.go($state.current.component, { page: pageNumber });
	};

	vm.applySort = (predicate) => {
		const direction = (predicate === vm.activeSort.predicate && vm.activeSort.direction === 'asc') ? 'desc' : 'asc';
		$state.go($state.current.component, { sort: `${predicate}:${direction}` });
	};

	vm.activeSort = typeof $stateParams.sort === 'string'
		? { predicate: $stateParams.sort.split(':')[0], direction: $stateParams.sort.split(':')[1] }
		: { predicate: 'timestamp', direction: 'desc' };


	if ($stateParams.blockId) {
		vm.block = {
			id: $stateParams.blockId,
		};
		vm.getBlock($stateParams.blockId);

		vm.txs = genericTxs({
			filters: [{ key: 'blockId', value: $stateParams.blockId }],
			page: $stateParams.page || 1,
			// limit: 50,
		});

		vm.txs.loadPageOffset = vm.loadPageOffset;
		vm.txs.activeSort = vm.activeSort;
		vm.txs.applySort = vm.applySort;
		vm.txs.loadPage = vm.loadPage;
	} else if ($stateParams.page) {
		vm.getLastBlocks($stateParams.page);
	} else {
		vm.getLastBlocks();
	}
};

AppBlocks.component('block', {
	template,
	controller: BlockConstructor,
	controllerAs: 'vm',
});
