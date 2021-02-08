FROM ubuntu:latest
LABEL maintainer="Douglas Tofoli <contact@dougrt.dev>"
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
  apt-get install -y build-essential && \
  apt-get install -y unzip && \
  apt-get install -y wget && \
  apt-get install -y libpcre3-dev && \
  apt-get install -y libcurl3-openssl-dev && \
  apt-get install -y libaio1 && \
  apt-get install -y libaio-dev && \
  apt-get install -y npm && \
  apt-get clean;

### Begin install of Oracle client
RUN mkdir /opt/oracle

RUN wget https://download.oracle.com/otn_software/linux/instantclient/191000/instantclient-basic-linux.x64-19.10.0.0.0dbru.zip -P /opt/oracle
RUN wget https://download.oracle.com/otn_software/linux/instantclient/191000/instantclient-sqlplus-linux.x64-19.10.0.0.0dbru.zip -P /opt/oracle
RUN wget https://download.oracle.com/otn_software/linux/instantclient/191000/instantclient-sdk-linux.x64-19.10.0.0.0dbru.zip -P /opt/oracle

RUN unzip /opt/oracle/instantclient-basic-linux.x64-19.10.0.0.0dbru.zip -d /opt/oracle
RUN unzip /opt/oracle/instantclient-sqlplus-linux.x64-19.10.0.0.0dbru.zip -d /opt/oracle
RUN unzip /opt/oracle/instantclient-sdk-linux.x64-19.10.0.0.0dbru.zip -d /opt/oracle

RUN rm /opt/oracle/instantclient-basic-linux.x64-19.10.0.0.0dbru.zip
RUN rm /opt/oracle/instantclient-sqlplus-linux.x64-19.10.0.0.0dbru.zip
RUN rm /opt/oracle/instantclient-sdk-linux.x64-19.10.0.0.0dbru.zip

ENV PATH /opt/oracle/instantclient_19_10:($PATH)
ENV LD_LIBRARY_PATH /opt/oracle/instantclient_19_10:($LD_LIBRARY_PATH)
ENV ORACLE_HOME /opt/oracle/instantclient_19_10:($ORACLE_HOME)

RUN echo /opt/oracle/instantclient_19_10 > /etc/ld.so.conf.d/oracle-instantclient.conf

RUN ldconfig

### End install of Oracle client

WORKDIR /usr/app

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

RUN npx tsc

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]
