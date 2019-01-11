FROM node:10-alpine

# Install package
RUN npm i -g portainer-companion

WORKDIR /app
ENTRYPOINT ["portainer-companion"]
