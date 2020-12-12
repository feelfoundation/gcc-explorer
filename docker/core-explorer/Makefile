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

compose := docker-compose -f docker-compose.yml -f docker-compose.make.yml -f docker-compose.config.yml -f  docker-compose.ports.yml

up:
	$(compose) up --detach

coldstart: up
	cp ../../data/test_blockchain-explorer.db.gz $(feel_net)_blockchain.db.gz
	$(compose) stop feel
	# $(compose) start db
	$(compose) run --rm db-task dropdb --if-exists $(feel_db)
	$(compose) run --rm db-task createdb $(feel_db)
	gzip --decompress --to-stdout $(feel_net)_blockchain.db.gz |$(compose) run --rm db-task psql >/dev/null
	$(compose) start feel

logs:
	$(compose) logs

clean:
	rm -f *blockchain.db.gz

down:
	$(compose) down --volumes --remove-orphans

mrproper: down clean
