.PHONY: build test run

build:
	docker-compose up --build --remove-orphans

test:
	@[ "${CONTAINER}" ] && \
		(docker exec -it $$CONTAINER /bin/bash -c "npm install request --no-save && npm test") || \
		(npm install request --no-save && npm test)

run:
	@[ "${CONTAINER}" ] && \
		(docker exec -it $$CONTAINER /bin/bash -c 'cd /usr/src/app/node-sdk-test/ && node test.js') || \
		(cd /usr/src/app/node-sdk-test/ && node test.js)