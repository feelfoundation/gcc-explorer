.PHONY: clean coldstart mrproper up
all: up

feel_net := $(shell grep ^ENV_FEEL_NETWORK= .env |tail -n 1 |awk -F = '{ gsub("net$$", ""); print $$2 }')
ifeq ($(feel_net),)
$(error .env file does not exist or ENV_FEEL_NETWORK variable is not set.)
endif
feel_db := $(shell grep ^ENV_FEEL_DB_DATABASE= .env |tail -n 1 |awk -F = '{ gsub("net$$", ""); print $$2 }')
ifeq ($(feel_net),)
$(error .env file does not exist or ENV_FEEL_DB_DATABASE variable is not set.)
endif

compose := docker-compose -f docker-compose.explorer.yml -f docker-compose.core.yml -f docker-compose.make.yml -f docker-compose.config.yml -f docker-compose.jenkins.yml

up:
	cp ../explorer/docker-compose.yml docker-compose.explorer.yml
	cp ../core-explorer/docker-compose.yml docker-compose.core.yml
	cp ../core-explorer/docker-compose.make.yml docker-compose.make.yml
	cp ../core-explorer/docker-compose.config.yml docker-compose.config.yml
	cp -a ../core-explorer/config ./
	$(compose) up --detach

coldstart: up
	cp ../../test/data/test_blockchain-explorer.db.gz $(feel_net)_blockchain.db.gz
	$(compose) stop feel gcc-explorer
	# $(compose) start db
	$(compose) run --rm db-task dropdb --if-exists $(feel_db)
	$(compose) run --rm db-task createdb $(feel_db)
	gzip --decompress --to-stdout $(feel_net)_blockchain.db.gz |$(compose) run --rm db-task psql >/dev/null
	$(compose) start feel gcc-explorer

logs:
	$(compose) logs

clean:
	rm -f *blockchain.db.gz
	rm docker-compose.explorer.yml docker-compose.core.yml docker-compose.make.yml docker-compose.config.yml
	rm -rf config

down:
	$(compose) down --volumes --remove-orphans

mrproper: down clean

eslint:
	$(compose) exec -T gcc-explorer npm run eslint

test:
	$(compose) exec -T gcc-explorer npm run test

http_status:
	$(compose) exec gcc-explorer curl --silent --fail 'http://localhost:16540/api/getLastBlocks' >/dev/null