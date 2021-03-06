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
import Sigma from 'sigma';
// import 'sigma/plugins/sigma.layout.forceAtlas2.min';
import '../../../node_modules/sigma/build/plugins/sigma.parsers.gexf.min';
import '../../../node_modules/sigma/build/plugins/sigma.parsers.json.min';
import '../../../node_modules/sigma/build/plugins/sigma.plugins.animate.min';
import '../../../node_modules/sigma/build/plugins/sigma.plugins.dragNodes.min';
import '../../../node_modules/sigma/build/plugins/sigma.plugins.filter.min';
import '../../../node_modules/sigma/build/plugins/sigma.plugins.neighborhoods.min';
import '../../../node_modules/sigma/build/plugins/sigma.plugins.relativeSize.min';
import '../../../node_modules/sigma/build/plugins/sigma.renderers.customEdgeShapes.min';
import '../../../node_modules/sigma/build/plugins/sigma.renderers.customShapes.min';
import '../../../node_modules/sigma/build/plugins/sigma.renderers.edgeLabels.min';
import '../../../node_modules/sigma/build/plugins/sigma.statistics.HITS.min';

import AppActivityGraph from './activity-graph.module';

const ActivityGraph = function () {
	this.loading = true;
	this.blocks = 0;
	this.maxBlocks = 20;
	this.indexes = [];

	this.colors = {
		account: '#0077bd', // Steel Blue: Account
		credit: '#008722', // Lawn Green : Credit
		debit: '#c80039', // Red : Debit
		block: '#ff6236', // Dark Orange: Block
		tx: '#3c5068', // Grey : Tx
	};

	this.renderer = {
		container: 'sigma-canvas',
		type: 'canvas',
	};

	this.settings = {
		sideMargin: 1,
		singleHover: true,
		minNodeSize: 0.5,
		maxNodeSize: 16,
		drawLabels: false,
		defaultEdgeType: 'arrow',
	};

	this.sigma = new Sigma({
		renderer: this.renderer,
		settings: this.settings,
	});

	function NodeSelect(sigma) {
		this.sigma = sigma;
		this.color = '#5bc0de';

		this.add = function (event) {
			this.remove(event);
			this.node = event.data.node;
			this.prevColor = this.node.color;
			this.node.color = this.color;
			this.sigma.refresh();
		};

		this.remove = function () {
			if (this.node) {
				this.node.color = this.prevColor;
				this.prevColor = undefined;
				this.node = undefined;
			}
			this.sigma.refresh();
		};

		this.selected = function () {
			return this.node !== undefined;
		};

		this.type = function () {
			if (this.selected()) {
				return this.node.type;
			}
			return undefined;
		};

		this.href = function () {
			switch (this.type()) {
			case 0:
				return `/tx/${this.node.id}`;
			case 1:
				return `/block/${this.node.id}`;
			case 2:
				return `/address/${this.node.id}`;
			default:
				return '#';
			}
		};
	}

	this.nodeSelect = new NodeSelect(this.sigma);

	function CameraMenu(camera) {
		this.camera = camera;

		this.reset = function () {
			if (this.camera) {
				this.camera.goTo({ x: 0, y: 0, angle: 0, ratio: 1 });
			}
		};
	}

	this.cameraMenu = new CameraMenu(this.sigma.camera);

	function Statistics(graph) {
		this.graph = graph;
		this.volume = 0;
		this.txs = 0;
		this.blocks = 0;
		this.accounts = 0;

		const txsVolume = arr => arr.reduce((vol, tx) => vol += tx.amount, 0);

		const minTime = arr => Math.min(...arr.map((block) => {
			if (block.timestamp > 0) {
				return block.timestamp;
			}
			return undefined;
		}));

		const maxTime = arr => Math.max(...arr.map((block) => {
			if (block.timestamp > 0) {
				return block.timestamp;
			}
			return undefined;
		}));

		this.refresh = function () {
			const txs = this.graph.nodesByType(0);
			const blocks = this.graph.nodesByType(1);
			const accounts = this.graph.nodesByType(2);

			this.txs = txs.length;
			this.volume = txsVolume(txs);
			this.blocks = blocks.length;
			this.beginning = minTime(blocks);
			this.end = maxTime(blocks);
			this.accounts = accounts.length;
		};
	}

	this.statistics = new Statistics(this);
};

ActivityGraph.prototype.refresh = function (block) {
	if (block) {
		this.addBlock(block);
	}
	if (this.blocks > 0) {
		this.loading = false;
	}
	if (this.sigma) {
		this.sizeNodes();
		this.positionNodes();
		this.statistics.refresh();
		this.sigma.refresh();
	}
};

ActivityGraph.prototype.clear = function () {
	this.blocks = 0;
	this.indexes = [];
	if (this.sigma) {
		this.sigma.graph.clear();
	}
};

ActivityGraph.prototype.sizeNodes = function () {
	this.sigma.graph.nodes().forEach((node) => {
		const deg = this.sigma.graph.degree(node.id);
		node.size = this.settings.maxNodeSize * Math.sqrt(deg);
	}, this);
};

ActivityGraph.prototype.nodesByType = function (type) {
	return this.sigma.graph.nodes().filter(node => node.type === type);
};

ActivityGraph.prototype.positionNodes = function () {
	for (let type = 0; type < 3; type++) {
		const nodes = this.nodesByType(type);
		let i;
		const len = nodes.length;
		const slice = (2 * Math.PI) / len;

		for (i = 0; i < len; i++) {
			const angle = slice * i;
			const graph = this.sigma.graph.nodes(nodes[i].id);
			graph.x = (type + 1) * Math.cos(angle);
			graph.y = (type + 1) * Math.sin(angle);
		}
	}
};

ActivityGraph.prototype.addNode = function (node) {
	if (!this.indexes.includes(node.id)) {
		node.x = Math.random();
		node.y = Math.random();
		this.indexes.push(node.id);
		this.sigma.graph.addNode(node);
	}
};

ActivityGraph.prototype.addEdge = function (edge) {
	if (!this.indexes.includes(edge.id)) {
		this.indexes.push(edge.id);
		this.sigma.graph.addEdge(edge);
	}
};

ActivityGraph.prototype.addTx = function (tx) {
	if (this.indexes.includes(tx.id)) { return; }
	this.addNode({
		id: tx.id,
		label: tx.id,
		type: 0,
		amount: tx.amount,
		color: this.colors.tx,
		size: 1,
	});
	this.indexes.push(tx.id);
	this.addTxSender(tx);
	this.addTxRecipient(tx);
};

ActivityGraph.prototype.addAccount = function (id) {
	this.addNode({
		id,
		type: 2,
		label: id,
		color: this.colors.account,
		size: 1,
	});
};

ActivityGraph.prototype.amount = (tx, sign) => `${sign + (tx.amount / Math.pow(10, 8))} GCC`;

ActivityGraph.prototype.addTxSender = function (tx) {
	this.addAccount(tx.senderId);
	this.addEdge({
		id: tx.id + tx.senderId + Math.random(),
		label: this.amount(tx, '-'),
		source: tx.senderId,
		target: tx.id,
		color: this.colors.debit,
		size: 1,
	});
};

ActivityGraph.prototype.addTxRecipient = function (tx) {
	if (!tx.recipientId) { return; }
	this.addAccount(tx.recipientId);
	this.addEdge({
		id: tx.id + tx.recipientId + Math.random(),
		label: this.amount(tx, '+'),
		source: tx.id,
		target: tx.recipientId,
		color: this.colors.credit,
		size: 1,
	});
};

ActivityGraph.prototype.addBlock = function (block) {
	if (this.indexes.includes(block.id)) { return; }
	if ((this.blocks + 1) > this.maxBlocks) { this.clear(); }
	this.addNode({
		id: block.id,
		label: block.id,
		timestamp: block.timestamp,
		type: 1,
		color: this.colors.block,
		size: 1,
	});
	this.blocks++;
	this.indexes.push(block.id);
	this.addBlockGenerator(block);
	this.addBlockTxs(block);
};

ActivityGraph.prototype.addBlockGenerator = function (block) {
	this.addAccount(block.generatorId);
	this.addEdge({
		id: block.id + block.generatorId,
		label: block.height.toString(),
		source: block.generatorId,
		target: block.id,
		color: this.colors.account,
		size: 1,
	});
};

ActivityGraph.prototype.addBlockTxs = function (block) {
	if (block.transactions && block.transactions.length) {
		block.transactions.forEach((tx) => {
			this.addTx(tx);
			this.addEdge({
				id: block.id + tx.id,
				source: block.id,
				target: tx.id,
				color: this.colors.block,
				size: 1,
			});
		}, this);
	}
};

AppActivityGraph.factory('activityGraph',
	($socket, $rootScope) => (vm) => {
		const ns = $socket('/activityGraph');
		const activityGraph = new ActivityGraph();

		vm.activityGraph = activityGraph;
		vm.nodeSelect = activityGraph.nodeSelect;
		vm.cameraMenu = activityGraph.cameraMenu;
		vm.statistics = activityGraph.statistics;

		activityGraph.sigma.bind('clickNode', (event) => {
			activityGraph.nodeSelect.add(event);
		});

		activityGraph.sigma.bind('clickStage doubleClickStage', (event) => {
			activityGraph.nodeSelect.remove(event);
		});

		ns.on('data', (res) => { activityGraph.refresh(res.block); });

		$rootScope.$on('$destroy', () => {
			ns.removeAllListeners();
		});

		$rootScope.$on('$stateChangeStart', () => {
			ns.emit('forceDisconnect');
		});

		return activityGraph;
	});
