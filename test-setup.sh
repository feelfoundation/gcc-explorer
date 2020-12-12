#!/bin/bash
# Purpose of this script is to clean feel database and load a snapshot to it

# Set env variables
FEEL_CORE_DIR=$1
INSTANT=$2
FEEL_EXPLORER_DIR=$(pwd)
BLOCKCHAIN_SNAPSHOT=test/data/test_blockchain-explorer.db.gz
FEEL_CORE_CONFIG=test/data/core_config.json
DATABASE_NAME=feel_explorer_test

## Perform initial checks
if [ -z "$FEEL_CORE_DIR" ]; then echo "Usage: $0 /path/to/feel/core [--instant]"; exit 1; fi
if [ ! -d "$FEEL_CORE_DIR" ]; then echo "The argument with the Feel Core path is not a directory"; exit 1; fi
if [ -z "$FEEL_CORE_DIR/app.js" ]; then echo "The Feel Core directory exists but it does not seem to be a Node.js application"; exit 1; fi
if [ -z "$FEEL_CORE_DIR/node_modules" ]; then echo "The Feel Core directory exists but its dependencies are not installed";  exit 1; fi
if [ ! -f "$FEEL_EXPLORER_DIR/$BLOCKCHAIN_SNAPSHOT" ]; then echo "Missing snapshot file: $FEEL_EXPLORER_DIR/$BLOCKCHAIN_SNAPSHOT"; exit 2; fi
if [ ! -f "$FEEL_EXPLORER_DIR/$FEEL_CORE_CONFIG" ]; then echo "Missing snapshot file: $FEEL_EXPLORER_DIR/$FEEL_CORE_CONFIG"; exit 2; fi

# Reload database snapshot
echo "Dropping database $DATABASE_NAME and creating a new one..."
dropdb $DATABASE_NAME
createdb $DATABASE_NAME

echo "Restoring snapshot into $DATABASE_NAME..."
gunzip -fcq "$FEEL_EXPLORER_DIR/$BLOCKCHAIN_SNAPSHOT" | psql -d $DATABASE_NAME > /dev/null

# Run the Feel Core node
echo "Running Feel Core node..."
cd $FEEL_CORE_DIR

# if --instant is set perform all the tests immediately
if [ "$INSTANT" == "--instant" ]
then
	node app.js -c $FEEL_EXPLORER_DIR/$FEEL_CORE_CONFIG 2&>1 logs/explorer_core.log &
	CORE_PID=$!
	echo "Core PID: $CORE_PID"

	cd $FEEL_EXPLORER_DIR
	echo "Rebuilding candles..."
	node_modules/grunt/bin/grunt candles:build > logs\candles_test.log

	# Run functional tests
	echo "Starting Explorer..."
	node app.js > logs\explorer_test.log &
	EXPLORER_PID=$!
	echo "Explorer PID: $EXPLORER_PID"

	npm run test
	kill $EXPLORER_PID
	kill $CORE_PID
else
	PM2_SILENT=true pm2 delete feel-core
	pm2 start app.js --name=feel-core -- -c $FEEL_EXPLORER_DIR/$FEEL_CORE_CONFIG
fi
