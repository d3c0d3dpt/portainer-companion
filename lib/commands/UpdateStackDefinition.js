module.exports = async function (stackName, definitionFile, cmd) {
    const Updater = require('../Updater');

    let result = await Updater.updateStack(stackName, definitionFile, cmd.force);
    return `Stack "${stackName}" ${(result ? 'updated' : 'did not change')}`;
};
