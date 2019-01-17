const PortainerClient = require('portainer-api-client');

const portainerUrl = process.env.PORTAINER_URL;
const portainerUsername = process.env.PORTAINER_USERNAME;
const portainerPassword = process.env.PORTAINER_PASSWORD;

let clientInstance;
let getClient = () => {
    // Validate if needed variables are set
    [ 'PORTAINER_URL', 'PORTAINER_USERNAME', 'PORTAINER_PASSWORD' ].forEach(variable => {
        let value = process.env[variable];

        if (value === undefined || value === '') {
            throw new Error(`Missing the "${variable}" environment variable`);
        }
    });

    if (!clientInstance) {
        clientInstance = new PortainerClient(portainerUrl, portainerUsername, portainerPassword);
    }

    return clientInstance;
};

module.exports = { getClient };

module.exports.Stacks = require('./apis/StacksApi')(getClient);
