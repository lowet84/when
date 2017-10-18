#!/bin/bash

docker build -t when-builder -f Dockerfile.build .
id=$(docker create when-builder)
docker cp $id:/out out
docker rm -f $id
docker build -t when .
rm -r out
