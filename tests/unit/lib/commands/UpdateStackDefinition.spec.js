const Command = require('../../../../lib/commands/UpdateStackDefinition');
const Updater = require('../../../../lib/Updater');

describe('lib/commands/UpdateStackDefinition.js', () => {
    Updater.updateStack = jest.fn();

    test('Returns "Stack updated" message if updateStack returns anything', async () => {
        Updater.updateStack.mockImplementationOnce(() => ({ hello: 'world' }));

        let result = await Command('test', 'test.yml', {});
        expect(result).toBe('Stack "test" updated');
    });

    test('Returns "Stack did not change" message if updateStack returns anything', async () => {
        Updater.updateStack.mockImplementationOnce(() => undefined);

        let result = await Command('test', 'test.yml', {});
        expect(result).toBe('Stack "test" did not change');
    });
});
