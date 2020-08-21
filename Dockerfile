FROM node:14-alpine

# Install package
RUN npm i -g portainer-companion

WORKDIR /app
CMD ["portainer"]
