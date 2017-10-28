#!/usr/bin/env bash

sudo docker rm -f $(sudo docker-compose ps -q)

sudo docker-compose up -d