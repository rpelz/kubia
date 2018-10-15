#!/usr/bin/env bash

IMAGE_NAME=kubia

DOCKER_HUB_USER=rpelz
VERSION=beta

docker login -u $DOCKER_HUB_USER

docker image tag $IMAGE_NAME $DOCKER_HUB_USER/$IMAGE_NAME:$VERSION

docker image push $DOCKER_HUB_USER/$IMAGE_NAME:$VERSION