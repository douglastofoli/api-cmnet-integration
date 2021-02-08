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

# ENV HTTP_PORT 3333

# ENV DB1_NAME oracledb
# ENV DB1_CONNECTION oracle
# ENV DB1_HOST 172.23.0.250
# ENV DB1_USERNAME cm
# ENV DB1_PASSWORD getic01
# ENV DB1_DATABASE cm
# ENV DB1_PORT 1521
# ENV DB1_SYNCHRONIZE true
# ENV DB1_ENTITIES src/entities/oracle/*{.ts,.js}
# ENV DB1_ENTITIES_DIR src/entities/oracle
# ENV DB1_SID cm

# ENV DB2_NAME postgresdb
# ENV DB2_CONNECTION postgres
# ENV DB2_HOST 172.17.0.1
# ENV DB2_USERNAME postgres
# ENV DB2_PASSWORD @thermaspg@
# ENV DB2_DATABASE api-cm
# ENV DB2_PORT 5432
# ENV DB1_SYNCHRONIZE true
# ENV DB2_ENTITIES src/entities/postgres/*{.ts,.js}
# ENV DB2_MIGRATIONS src/database/migrations/*{.ts,.js}
# ENV DB2_MIGRATIONS_RUN src/database/migrations
# ENV DB2_ENTITIES_DIR src/entities/postgres

# ENV JWT_SECRET 2f58cd689fe4e2d4db80b085e7c1049c

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]
