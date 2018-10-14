#! /bin/bash

CONTAINER_NAME=kubia-test
PORT=8088

docker build --rm -t kubia .

docker run --rm --name $CONTAINER_NAME -p $PORT:8080 -d kubia

echo "Container runs on port:$PORT"

echo "To stop test container: 'docker stop $CONTAINER_NAME'"