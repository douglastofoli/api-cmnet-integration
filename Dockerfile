FROM ubuntu:latest
LABEL maintainer="Douglas Tofoli <contact@dougrt.dev>"
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
  apt-get install -y build-essential && \
  apt-get install -y npm && \
  apt-get clean;

WORKDIR /usr/app

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
