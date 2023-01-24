DOCKER := docker

TAG := comp-soc-website

CONTAINER_PORT := 8000
HOST_PORT := 8000


build:
	@-rm -rf target
	sudo $(DOCKER) build -t $(TAG) -f ./Dockerfile .

run:
	sudo $(DOCKER) run -p $(HOST_PORT):$(CONTAINER_PORT) --name $(TAG) $(TAG)

stop:
	@-sudo $(DOCKER) stop $(TAG)
	@sudo $(DOCKER) rm $(TAG)


.PHONY: build run
