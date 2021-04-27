#!/bin/bash

rm -rf src/core

git clone git@github.com:techmmunity/core.git

mv core/src src/core

rm -rf core
