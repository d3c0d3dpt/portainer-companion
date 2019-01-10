const PortainerClient = require('portainer-api-client');

const portainerUrl = process.env.PORTAINER_URL;
const portainerUsername = process.env.PORTAINER_USERNAME;
const portainerPassword = process.env.PORTAINER_PASSWORD;

const client = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);

module.exports = {};

module.exports.Stacks = require('./apis/StacksApi')(client);


// let registries = await portainer.callApiWithKey('getAllStacks', '/api/registries');
// registry = registries[0]
//
// registry.Username = 'newusername';
// registry.Password = 'newusername';
//
// await portainer.callApiWithKey('PUT', '/api/registries/' + registry.Id, registry);
