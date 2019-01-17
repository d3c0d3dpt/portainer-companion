module.exports = async function (stackName, variableName, variableValue) {
    const Updater = require('../Updater');

    let result = await Updater.updateStackVariable(stackName, variableName, variableValue);
    return `Variable "${variableName}" ${result}`;
};
