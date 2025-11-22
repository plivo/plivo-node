.PHONY: build test run

build:
	docker-compose up --build --remove-orphans

start:
	docker-compose up --build --remove-orphans --detach
	# Wait for the container to be running before attaching
	@while [ -z "$$(docker-compose ps -q nodeSDK)" ]; do \
		sleep 1; \
	done
	docker attach $$(docker-compose ps -q nodeSDK)

test:
	@[ "${CONTAINER}" ] && \
		(docker exec -it $$CONTAINER /bin/bash -c "npm test") || \
		(npm test)

run:
	@[ "${CONTAINER}" ] && \
		(docker exec -it $$CONTAINER /bin/bash -c 'cd /usr/src/app/node-sdk-test/ && node test.js') || \
		(cd /usr/src/app/node-sdk-test/ && node test.js)