# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.191.1/containers/debian/.devcontainer/base.Dockerfile

# [Choice] Debian version: bullseye, buster, stretch
ARG VARIANT="bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt upgrade -y \
    && apt -y install xz-utils

ARG NODE_VERSION=v16.8.0

RUN wget https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.xz \ 
   && tar Jxvf node-${NODE_VERSION}-linux-x64.tar.xz \ 
   && mv node-${NODE_VERSION}-linux-x64/bin/* /usr/local/bin/ \ 
   && mv node-${NODE_VERSION}-linux-x64/lib/* /usr/local/lib/ \ 
   && mv node-${NODE_VERSION}-linux-x64/share/* /usr/local/share/ \ 
   && mv node-${NODE_VERSION}-linux-x64/include/* /usr/local/include/ \ 
   && rm -rf node-${NODE_VERSION}-linux-x64 node-${NODE_VERSION}-linux-x64.tar.xz

RUN npm install -g yarn

# chromeで使うamd64bitに依存するパッケージをインストールするためにamd64bitを有効化
RUN dpkg --add-architecture amd64 \
    && dpkg --print-foreign-architectures \
    && apt-get update

# RUN apt install -y libappindicator1 fonts-liberation libasound2 libnspr4 libnss3 libxss1 lsb-release xdg-utils
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y ./google-chrome-stable_current_amd64.deb \
    && rm ./google-chrome-stable_current_amd64.deb

# 日本語のフォントを入れるために必要。
RUN apt install -y task-japanese \
    && locale-gen ja_JP.UTF-8 \
    && localedef -f UTF-8 -i ja_JP ja_JP

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
