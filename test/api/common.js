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
	blockId: '6524861224470851795',
	address: '8273455169423958419L',
	tx: '1465651642158264047',
	username: 'genesis_1',
};

describe('Common API', () => {
	/* Define functions for use within tests */
	const getVersion = (done) => {
		node.get('/api/version', done);
	};

	const getPriceTicker = (done) => {
		node.get('/api/getPriceTicker', done);
	};

	const getSearch = (id, done) => {
		node.get(`/api/search?id=${id}`, done);
	};

	const getUnifiedSearch = (id, done) => {
		node.get(`/api/unifiedSearch?q=${id}`, done);
	};

	/* Define api endpoints to test */
	describe('GET /api/version', () => {
		it('should be ok', (done) => {
			getVersion((err, res) => {
				node.expect(res.body).to.have.property('version');
				done();
			});
		});
	});

	describe('GET /api/getPriceTicker', () => {
		it('should be ok', (done) => {
			getPriceTicker((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('tickers').that.is.an('object');
				done();
			});
		});
	});


	// Original search, not used by the UI anymore
	describe('GET /api/search', () => {
		it('using known block should be ok', (done) => {
			getSearch(params.blockId, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('block');
				node.expect(res.body.result.id).to.equal(params.blockId);
				done();
			});
		});

		it('using known height should be ok', (done) => {
			getSearch('1', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('block');
				node.expect(res.body.result.id).to.equal(params.blockId);
				done();
			});
		});

		it('using known address should be ok', (done) => {
			getSearch(params.address, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('address');
				node.expect(res.body.result.id).to.equal(params.address);
				done();
			});
		});

		it('using known transaction should be ok', (done) => {
			getSearch(params.tx, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('tx');
				node.expect(res.body.result.id).to.equal(params.tx);
				done();
			});
		});

		it('using known delegate should be ok', (done) => {
			getSearch(params.username, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('delegate');
				node.expect(res.body.result.delegates[0].address).to.equal(params.address);
				done();
			});
		});

		it('using partial known delegate should be ok', (done) => {
			const partialName = 'gene';
			getSearch(partialName, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result.type).to.equal('delegate');
				res.body.result.delegates.map(delegate =>
					node.expect(delegate.username).to.have.string(partialName));
				done();
			});
		});

		it('using no input should fail', (done) => {
			getSearch('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(false);
				node.expect(res.body).to.have.property('error').to.be.a('string');
				done();
			});
		});
	});

	// New search
	describe('GET /api/unifiedSearch', () => {
		it('using known block should be ok', (done) => {
			getUnifiedSearch(params.blockId, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result[0].type).to.equal('block');
				node.expect(res.body.result[0].id).to.equal(params.blockId);
				done();
			});
		});

		it('using known height should be ok', (done) => {
			getUnifiedSearch('1', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result[0].type).to.equal('block');
				node.expect(res.body.result[0].id).to.equal(params.blockId);
				done();
			});
		});

		it('using known address should be ok', (done) => {
			getUnifiedSearch(params.address, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result[0].type).to.equal('address');
				node.expect(res.body.result[0].id).to.equal(params.address);
				done();
			});
		});

		it('using known transaction should be ok', (done) => {
			getUnifiedSearch(params.tx, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result[0].type).to.equal('tx');
				node.expect(res.body.result[0].id).to.equal(params.tx);
				done();
			});
		});

		it('using known delegate should be ok', (done) => {
			getUnifiedSearch(params.username, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result[0].type).to.equal('address');
				node.expect(res.body.result[0].id).to.equal(params.address);
				done();
			});
		});

		it('using partial known delegate should be ok', (done) => {
			const partialName = 'gene';
			getUnifiedSearch(partialName, (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body.result[0].type).to.equal('address');
				res.body.result.map(delegate =>
					node.expect(delegate.description).to.have.string(partialName));
				done();
			});
		});

		it('using no input should result empty array', (done) => {
			getUnifiedSearch('', (err, res) => {
				node.expect(res.body).to.have.property('success').to.be.equal(true);
				node.expect(res.body).to.have.property('result').to.be.lengthOf(0);
				done();
			});
		});
	});
});
