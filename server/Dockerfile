FROM pevtrick/arm32v7-node:8.0.0

RUN mkdir -p /src/api/
ADD . /src/api/
WORKDIR /src/api/

RUN echo 'America/Recife' > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

RUN npm i
CMD ["npm", "start"]
