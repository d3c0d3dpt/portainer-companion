#!/usr/bin/env node

const [,, ...args] = process.argv;

// const args = ['raspberry-compose', 'raspberry-compose.yml'];

(async () => {
    if (args[0] && args[1]) {
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
