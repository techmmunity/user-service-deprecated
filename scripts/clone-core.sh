#!/bin/bash

rm -rf src/core

git clone git@github.com:razal-discord-bot/core-backend.git src/core

cd src/core

yarn --cwd src/core --production=true