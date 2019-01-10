FROM node:10-alpine

# Install package
RUN npm i -g portainer-companion

ENTRYPOINT ["portainer-companion"]
