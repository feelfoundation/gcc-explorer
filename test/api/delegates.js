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
const node = require('./../node.js');

const params = {
	publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
	noBlocksKey: '968ba2fa993ea9dc27ed740da0daf49eddd740dbd7cb1cb4fc5db3a20baf341b',
	invalidPublicKey: 'abdefghijklmnopqrstuvwyxz',
	delegate: 'genesis_1',
	address: '8273455169423958419L',
	offset: 20,
	excessiveOffset: 10000,
};

describe('Delegates API', () => {
	/* Define functions for use within tests */
	const getActive = (done) => {
		node.get('/api/delegates/getActive', done);
	};

	const getStandby = (id, done) => {
		node.get(`/api/delegates/getStandby?n=${id}`, done);
	};

	const getLatestRegistrations = (done) => {
		node.get('/api/delegates/getLatestRegistrations', done);
	};

	const getLastBlock = (done) => {
		node.get('/api/delegates/getLastBlock', done);
	};

	const getLastBlocks = (id1, id2, done) => {
		node.get(`/api/delegates/getLastBlocks?publicKey=${id1}&limit=${id2}`, done);
	};

	const getSearch = (id, done) => {
		node.get(`/api/getSearch?q=${id}`, done);
	};

	const getNextForgers = (done) => {
		node.get('/api/delegates/getNextForgers', done);
	};

	function checkBlockTypes(o) {
		node.expect(o.totalForged).to.be.a('string');
		node.expect(o.confirmations).to.be.a('number');
		node.expect(o.blockSignature).to.be.a('string');
		node.expect(o.generatorId).to.be.a('string');
		node.expect(o.generatorPublicKey).to.be.a('string');
		node.expect(o.payloadHash).to.be.a('string');
		node.expect(o.payloadLength).to.be.a('number');
		node.expect(o.reward).to.be.a('number');
		node.expect(o.id).to.be.a('string');
		node.expect(o.version).to.be.a('number');
		node.expect(o.timestamp).to.be.a('number');
		node.expect(o.height).to.be.a('number');
		node.expect(o.previousBlock).to.be.a('string');
		node.expect(o.numberOfTransactions).to.be.a('number');
		node.expect(o.totalAmount).to.be.a('number');
		node.expect(o.totalFee).to.be.a('number');
	}

	const checkBlock = (o) => {
		node.expect(o).to.contain.all.keys(
			'totalForged',
			'confirmations',
			'blockSignature',
			'generatorId',
			'generatorPublicKey',
			'payloadHash',
			'payloadLength',
			'reward',
			'id',
			'version',
			'timestamp',
			'height',
			'previousBlock',
			'numberOfTransactions',
			'totalAmount',
			'totalFee');

		checkBlockTypes(o);
	};

	/* Testing functions */
	const checkBlocks = (id) => {
		for (let i = 0; i < id.length; i++) {
			checkBlock(id[i]);
		}
	};

	function checkDelegateTypes(o) {
		node.expect(o.address).to.be.a('string');
		node.expect(o.approval).to.be.a('number');
		node.expect(o.missedblocks).to.be.a('number');
		node.expect(o.producedblocks).to.be.a('number');
		node.expect(o.productivity).to.be.a('number');
		node.expect(o.publicKey).to.be.a('string');
		node.expect(o.rate).to.be.a('number');
		node.expect(o.username).to.be.a('string');
		node.expect(o.vote).to.be.a('string');
	}

	const checkDelegate = (o) => {
		node.expect(o).to.contain.all.keys(
			'productivity',
			'username',
			'address',
			'publicKey',
			'vote',
			'producedblocks',
			'missedblocks',
			'rate',
			'approval');

		checkDelegateTypes(o);
	};

	const checkDelegates = (id) => {
		for (let i = 0; i < id.length; i++) {
			checkDelegate(id[i]);
		}
	};

	const checkPublicKeys = (id) => {
		for (let i = 0; i < id.length; i++) {
			node.expect(typeof id[i]).to.be.equal('string');
		}
	};

	const checkTransactions = (id) => {
		for (let i = 0; i < id.length; i++) {
			node.expect(id[i]).to.contain.all.keys(
				'asset',
				'delegate',
				'confirmations',
				'signatures',
				'signature',
				'fee',
				'amount',
				'id',
				'height',
				'blockId',
				'type',
				'timestamp',
				'senderPublicKey',
				'senderId',
				'recipientId');

			checkDelegate(id[i].delegate);
		}
	};

	const checkDelegateSuggestions = (list) => {
		for (let i = 0; i < list.length; i++) {
			node.expect(list[i]).to.contain.all.keys(
				'username',
				'address',
				'similarity');
		}
	};


	/* Define api endpoints to test */
	describe('GET /api/delegates/getActive', () => {
		it('should be ok', (done) => {
			getActive((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('delegates');
				node.expect(res.body).to.have.property('totalCount');
				checkDelegates(res.body.delegates);
				done();
			});
		});
	});

	describe('GET /api/delegates/getStandby', () => {
		it('using no offset should be ok', (done) => {
			getStandby('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('delegates');
				checkDelegates(res.body.delegates);
				node.expect(res.body).to.have.property('pagination');
				node.expect(res.body).to.have.property('totalCount');
				node.expect(res.body.pagination).to.have.property('currentPage');
				node.expect(res.body.pagination.currentPage).to.be.equal(null);
				done();
			});
		});

		it('using offset of 1 should be ok', (done) => {
			getStandby('1', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('delegates');
				checkDelegates(res.body.delegates);
				node.expect(res.body).to.have.property('pagination');
				node.expect(res.body).to.have.property('totalCount');
				node.expect(res.body.pagination).to.have.property('currentPage');
				node.expect(res.body.pagination).to.have.property('more');
				node.expect(res.body.pagination).to.have.property('nextPage');
				done();
			});
		});

		it('using offset of 20 should be ok', (done) => {
			getStandby(params.offset, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('delegates');
				checkDelegates(res.body.delegates);
				node.expect(res.body).to.have.property('pagination');
				node.expect(res.body).to.have.property('totalCount');
				node.expect(res.body.pagination).to.have.property('currentPage');
				node.expect(res.body.pagination).to.have.property('before');
				node.expect(res.body.pagination).to.have.property('previousPage');
				node.expect(res.body.pagination).to.have.property('more');
				node.expect(res.body.pagination).to.have.property('nextPage');
				done();
			});
		});

		it('using offset of 100000 should be ok', (done) => {
			getStandby(params.excessiveOffset, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('delegates');
				checkDelegates(res.body.delegates);
				node.expect(res.body).to.have.property('pagination');
				node.expect(res.body).to.have.property('totalCount');
				node.expect(res.body.pagination).to.have.property('currentPage');
				node.expect(res.body.pagination).to.have.property('before');
				node.expect(res.body.pagination).to.have.property('previousPage');
				done();
			});
		});
	});

	describe('GET /api/delegates/getLatestRegistrations', () => {
		it('should be ok', (done) => {
			getLatestRegistrations((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('transactions');
				checkTransactions(res.body.transactions);
				done();
			});
		});
	});

	describe('GET /api/delegates/getLastBlock', () => {
		it('should be ok', (done) => {
			getLastBlock((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('block');
				checkBlock(res.body.block);
				checkDelegate(res.body.block.delegate);
				done();
			});
		});
	});

	describe('GET /api/delegates/getLastBlocks', () => {
		it('should be ok', (done) => {
			getLastBlocks(params.publicKey, '', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('blocks');
				checkBlocks(res.body.blocks);
				done();
			});
		});

		it('using limit 10 should be ok', (done) => {
			getLastBlocks(params.publicKey, '10', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('blocks').to.be.an('array');
				node.expect(res.body).to.have.property('blocks');
				node.expect(res.body.blocks.length).to.equal(10);
				checkBlocks(res.body.blocks);
				done();
			});
		});

		it('using limit 100 should be ok and return 20', (done) => {
			getLastBlocks(params.publicKey, '100', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('blocks');
				node.expect(res.body.blocks.length).to.equal(20);
				checkBlocks(res.body.blocks);
				done();
			});
		});

		it('using publicKey with no blocks should be ok', (done) => {
			getLastBlocks(params.noBlocksKey, '', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('blocks');
				done();
			});
		});

		it('using invalid publickey should fail', (done) => {
			getLastBlocks(params.invalidPublicKey, '', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using no parameters should fail', (done) => {
			getLastBlocks('', '', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});
	});

	describe('GET /api/getSearch', () => {
		it('should be ok', (done) => {
			getSearch(params.delegate, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.results.length).to.be.above(1);
				checkDelegateSuggestions(res.body.results);
				done();
			});
		});

		it('using no parameters should fail', (done) => {
			getSearch('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error');
				done();
			});
		});

		it('using partial name should autocomplete', (done) => {
			getSearch('gene', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.results.length).to.be.above(1);
				checkDelegateSuggestions(res.body.results);
				done();
			});
		});
	});

	describe('GET /api/delegates/getNextForgers', () => {
		it('should be ok', (done) => {
			getNextForgers((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('delegates');
				checkPublicKeys(res.body.delegates);
				done();
			});
		});
	});
});
