const PortainerClient = require('portainer-api-client');

const portainerUrl = process.env.PORTAINER_URL;
const portainerUsername = process.env.PORTAINER_USERNAME;
const portainerPassword = process.env.PORTAINER_PASSWORD;

const client = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);

module.exports = {};

module.exports.Stacks = require('./apis/StacksApi')(client);
