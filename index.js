#!/usr/bin/env node

const [,, ...args] = process.argv;

process.env.ALWAYS_UPDATE = process.env.ALWAYS_UPDATE || args[2] === 'true';

(async () => {
    if (!process.env.PORTAINER_URL) {
        console.error('Missing the "PORTAINER_URL" environment variable');
    } else if (!process.env.PORTAINER_USERNAME) {
        console.error('Missing the "PORTAINER_USERNAME" environment variable');
    } else if (!process.env.PORTAINER_PASSWORD) {
        console.error('Missing the "PORTAINER_PASSWORD" environment variable');
    } else if (args[0] && args[1]) {
        const Updater = require('./lib/Updater');

        try {
            let result = await Updater.updateStack(args[0], args[1]);

            if (result) {
                console.log(`Stack "${args[0]}" updated`);
            } else {
                console.log(`Stack "${args[0]}" did not change`);
            }
        } catch (err) {
            console.error(err);
        }
    }
})();
