const FS = require('fs');

const PortainerApi = require('./PortainerApi');

module.exports = {
    /**
     * Parses the #force_update# parameter
     * @param {string} forceUpdate
     * @returns {boolean}
     */
    parseForceUpdate (forceUpdate) {
        return forceUpdate === 'true' || process.env.FORCE_UPDATE === 'true';
    },

    /**
     * Validate the #stack_definition_file# parameter
     * @param {string} filename
     * @returns {string}
     */
    validateStackDefinitionFile (filename) {
        if (!filename || !filename.length) {
            throw new Error('Invalid #stack_definition_file#');
        }

        return filename;
    },

    /**
     * Validate the #stack_name# parameter
     * @param {string} stackName
     * @returns {string}
     */
    validateStackName (stackName) {
        if (!stackName || !stackName.length) {
            throw new Error('Invalid #stack_name#');
        }

        return stackName;
    },

    /**
     * Validate if required Environment Variables are set
     */
    verifyRequiredVariables () {
        [ 'PORTAINER_URL', 'PORTAINER_USERNAME', 'PORTAINER_PASSWORD' ].forEach(variable => {
            let value = process.env[variable];

            if (value === undefined || value === '') {
                throw new Error(`Missing the "${variable}" environment variable`);
            }
        });
    },

    /**
     * Retrieve stack info for the given #stack_name#
     * @param {string} stackName
     * @returns {Promise<{}>}
     */
    async getStackByStackName (stackName) {
        let stacks = await PortainerApi.Stacks.getAllStacks();

        for (let a = 0; a < stacks.length; a++) {
            if (stacks[a].Name === stackName) {
                return stacks[a];
            }
        }

        throw new Error(`Stack "${stackName}" not found`);
    },

    /**
     * Read #stack_definition_file# contents and retrieve them
     * @param {string} filename
     * @returns {Promise<string>}
     */
    async getStackDefinitionByFile (filename) {
        return FS.readFileSync(filename).toString();
    },

    /**
     * Retrieve a stack definition from Portainer
     * @param {string} stackId
     * @returns {Promise<string>}
     */
    async getStackDefinitionByStackId (stackId) {
        let stackFile = await PortainerApi.Stacks.getStackFile(stackId);

        if (stackFile && stackFile.StackFileContent) {
            return stackFile.StackFileContent;
        }

        throw new Error('Unable to retrieve current Stack Definition');
    },

    /**
     * @param args
     * @returns {Promise<*>}
     */
    async updateStack (...args) {
        let stackName = this.validateStackName(args[0]);
        let stackDefinitionFile = this.validateStackDefinitionFile(args[1]);
        let forceUpdate = this.parseForceUpdate(args[2]);

        let stack = this.getStackByStackName(stackName);
        let stackDefinition = this.getStackDefinitionByFile(stackDefinitionFile);

        stack = await stack;
        if (forceUpdate || (await this.getStackDefinitionByStackId(stack.Id) !== await stackDefinition)) {
            return PortainerApi.Stacks.updateStack(stack.Id, stack.EndpointId, await stackDefinition, stack.Env, true);
        }
    }
};
