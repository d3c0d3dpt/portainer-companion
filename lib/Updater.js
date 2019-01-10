const FS = require('fs');

const PortainerApi = require('./PortainerApi');

module.exports = {
    async getStackByStackName (stackName) {
        let stacks = await PortainerApi.Stacks.getAllStacks();

        for (let a = 0; a < stacks.length; a++) {
            if (stacks[a].Name === stackName) {
                return stacks[a];
            }
        }
    },

    async updateStack (stackName, stackDefinitionFile) {
        let stack = await this.getStackByStackName(stackName);
        if (!stack) {
            return console.error(`Stack "${stackName}" not found`);
        }

        let stackId = stack.Id;
        let stackDefinition = FS.readFileSync(stackDefinitionFile).toString();

        let currentStackFileContent = await PortainerApi.Stacks.getStackFileContent(stackId);
        if (currentStackFileContent.StackFileContent !== stackDefinition) {
            return await PortainerApi.Stacks.updateStack(stackId, stack.EndpointId, stackDefinition, stack.Env, true)
        }
    }
};
