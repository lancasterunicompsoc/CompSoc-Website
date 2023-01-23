DOCKER := docker

TAG := comp-soc-website

CONTAINER_PORT := 8000
HOST_PORT := 8000


build:
	sudo $(DOCKER) build -t $(TAG) -f ./Dockerfile .

run: build
	sudo $(DOCKER) run -p $(HOST_PORT):$(CONTAINER_PORT) --name $(TAG) $(TAG)

stop:
	sudo $(DOCKER) stop $(TAG)


.PHONY: build run
