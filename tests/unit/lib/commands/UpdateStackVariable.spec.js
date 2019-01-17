const Command = require('../../../../lib/commands/UpdateStackVariable');
const Updater = require('../../../../lib/Updater');

describe('lib/commands/UpdateStackVariable.js', () => {
    Updater.updateStackVariable = jest.fn();

    test('Returns the message with updateStackVariable status #1', async () => {
        Updater.updateStackVariable.mockImplementationOnce(() => 'did not change');

        let result = await Command('test', 'test-variable', 'test');
        expect(result).toBe('Variable "test-variable" did not change');
    });

    test('Returns the message with updateStackVariable status #2', async () => {
        Updater.updateStackVariable.mockImplementationOnce(() => 'added');

        let result = await Command('test', 'test-variable', 'test');
        expect(result).toBe('Variable "test-variable" added');
    });

    test('Returns the message with updateStackVariable status #3', async () => {
        Updater.updateStackVariable.mockImplementationOnce(() => 'updated');

        let result = await Command('test', 'test-variable', 'test');
        expect(result).toBe('Variable "test-variable" updated');
    });

    test('Returns the message with updateStackVariable status #4', async () => {
        Updater.updateStackVariable.mockImplementationOnce(() => 'removed');

        let result = await Command('test', 'test-variable');
        expect(result).toBe('Variable "test-variable" removed');
    });
});
