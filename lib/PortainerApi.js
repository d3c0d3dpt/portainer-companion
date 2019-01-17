const PortainerClient = require('portainer-api-client');

const portainerUrl = process.env.PORTAINER_URL;
const portainerUsername = process.env.PORTAINER_USERNAME;
const portainerPassword = process.env.PORTAINER_PASSWORD;

let clientInstance;
let getClient = () => {
    if (!clientInstance) {
        clientInstance = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);
    }

    return clientInstance;
};

module.exports = {};

module.exports.Stacks = require('./apis/StacksApi')(getClient);
