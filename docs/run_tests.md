# Feel Explorer Test Suite

## Functional Tests

Before running any tests, please ensure Feel Explorer and Feel Client are configured to run on the Feel Testnet.

> Hint: Make sure you have `wget` installed.

```
bash ./test-setup.sh /PATH_TO_FEEL_DIR
```

Launch Feel Explorer (runs on port `16540`):

```
pm2 start pm2-explorer.json
```

Run the test suite:

```
npm test
```

Run individual tests:

```
npm test -- test/api/accounts.js
npm test -- test/api/transactions.js
```

## End-to-end Tests

### Setup for end-to-end tests:

Do all setup steps from "Test" section of this readme

> Hint: Make sure you have `wget` installed.

Setup protractor

```
npm run install:e2e
```

### Run end-to-end test suite:

```
./test-setup.sh /PATH_TO_FEEL_DIR
npm run test:e2e -s
```

### Run one end-to-end test feature file:

```
npm run test:e2e -s -- --specs=features/address.feature
```