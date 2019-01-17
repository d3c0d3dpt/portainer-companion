const FS = require('fs');

const PortainerApi = require('./PortainerApi');

module.exports = {
    /**
     * Parses the "force update" option
     * @param {boolean} [forceUpdate]
     * @returns {boolean}
     */
    parseForceUpdate (forceUpdate) {
        return forceUpdate !== undefined ? forceUpdate === true : process.env.FORCE_UPDATE === 'true';
    },

    /**
     * Validate the <stack_file> argument
     * @param {string} filename
     * @returns {string}
     */
    validateStackDefinitionFile (filename) {
        if (!filename || !filename.length) {
            throw new Error('Invalid <stack_file>');
        }

        return filename;
    },

    /**
     * Validate the <stack_name> argument
     * @param {string} stackName
     * @returns {string}
     */
    validateStackName (stackName) {
        if (!stackName || !stackName.length) {
            throw new Error('Invalid <stack_name>');
        }

        return stackName;
    },

    /**
     * Validate the <variable_name> argument
     * @param {string} variableName
     * @returns {string}
     */
    validateStackVariableName (variableName) {
        if (!variableName || !variableName.length) {
            throw new Error('Invalid <variable_name>');
        }

        return variableName;
    },

    /**
     * @param {{name: string, value: string}[]} variableArray
     * @returns {Object}
     */
    variableArrayToMap (variableArray) {
        return variableArray.reduce(
            (reduced, { name, value }) => ({ ...reduced, [name]: value }),
            {}
        );
    },

    /**
     * @param {Object} variableMap
     * @returns {{name: string, value: string}[]}
     */
    variableMapToArray (variableMap) {
        return Object.keys(variableMap).map(
            name => ({ name, value: variableMap[name] })
        ).filter(
            ({ value }) => value !== undefined
        );
    },

    /**
     * Retrieve stack info for the given <stack_name>
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
     * Read <stack_file> contents and retrieve them
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
     * @param {string} name
     * @param {string} definitionFile
     * @param {boolean} [force]
     * @returns {Promise<*>}
     */
    async updateStack (name, definitionFile, force) {
        let stackName = this.validateStackName(name);
        let stackDefinitionFile = this.validateStackDefinitionFile(definitionFile);
        let forceUpdate = this.parseForceUpdate(force);

        let stack = this.getStackByStackName(stackName);
        let stackDefinition = this.getStackDefinitionByFile(stackDefinitionFile);

        stack = await stack;
        if (forceUpdate || (await this.getStackDefinitionByStackId(stack.Id) !== await stackDefinition)) {
            return PortainerApi.Stacks.updateStack(stack, await stackDefinition, stack.Env, true);
        }
    },

    /**
     * @param {string} name
     * @param {string} variable
     * @param {string} [variableValue]
     * @returns {Promise<string>}
     */
    async updateStackVariable (name, variable, variableValue) {
        let stackName = this.validateStackName(name);
        let variableName = this.validateStackVariableName(variable);

        let stack = await this.getStackByStackName(stackName);
        let variables = this.variableArrayToMap(stack.Env);

        variables[variableName] = variableValue;
        variables = this.variableMapToArray(variables);

        if (JSON.stringify(stack.Env) !== JSON.stringify(variables)) {
            let stackDefinition = this.getStackDefinitionByStackId(stack.Id);

            if (await PortainerApi.Stacks.updateStack(stack, await stackDefinition, variables, true)) {
                let diff = variables.length - stack.Env.length;

                return diff > 0 ? 'added' : diff < 0 ? 'removed' : 'updated';
            }
        }

        return 'did not change';
    }
};
