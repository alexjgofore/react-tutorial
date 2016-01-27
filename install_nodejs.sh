#!/bin/bash

sudo apt-get update
sudo apt-get install -y build-essential libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
source ~/.profile
nvm install stable
nvm use stable
nvm alias default stable
