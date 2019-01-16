module.exports = async function(stackName, definitionFile, cmd) {
    const Updater = require('../Updater');

    try {
        Updater.verifyRequiredVariables();

        if (await Updater.updateStack(stackName, definitionFile, cmd.force)) {
            console.log(`Stack "${stackName}" updated`);
        } else {
            console.log(`Stack "${stackName}" did not change`);
        }
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
};
