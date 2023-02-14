.PHONY: build test

build:
	docker-compose up --build --remove-orphans

test:
	docker exec -it $$CONTAINER /bin/bash -c "npm install request --no-save && npm test"