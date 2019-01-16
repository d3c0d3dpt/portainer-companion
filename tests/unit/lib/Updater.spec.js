const PortainerApi = require('../../../lib/PortainerApi');
const Updater = require('../../../lib/Updater');

describe('lib/Updater.js', () => {
    describe('parseForceUpdate()', () => {
        let deleteForceUpdate = () => delete process.env.FORCE_UPDATE;

        beforeEach(deleteForceUpdate);
        afterAll(deleteForceUpdate);

        test.each([
            [ 'False when "true" (as boolean)', true, true ],
            [ 'True when "true" (as string)', 'true', false ],
            [ 'False when "false" (as boolean)', false, false ],
            [ 'False when "false" (as string)', 'false', false ],
            [ 'False when random string is given', 'totally random string', false ],
            [ 'False when random integer is given', 1234567890, false ]
        ])('%s is given', (name, value, expectedResult) => {
            expect(Updater.parseForceUpdate(value)).toBe(expectedResult);
        });

        test.each([
            [ 'True when "true" (as string)', 'true', true ],
            [ 'True when "true" (as boolean)', true, true ],
            [ 'False when "false" (as string)', 'false', false ],
            [ 'False when "false" (as boolean)', false, false ],
            [ 'False when random string is given', 'totally random string', false ],
            [ 'False when random integer is given', 1234567890, false ]
        ])('%s is on the FORCE_UPDATE environment variable', (name, value, expectedResult) => {
            // When defining a process.env variable, it's treated as a string.
            process.env.FORCE_UPDATE = value;

            expect(Updater.parseForceUpdate(undefined)).toBe(expectedResult);
        });

        test('Returns false if nothing is given, and FORCE_UPDATE is not present', () => {
            expect(process.env.FORCE_UPDATE).not.toBeDefined();
            expect(Updater.parseForceUpdate(undefined)).toBe(false);
        })
    });

    describe('validateStackDefinitionFile()', () => {
        let call = argument => Updater.validateStackDefinitionFile.bind(Updater, argument);

        test('Returns a string if a valid string is given', () => {
            let string = 'test-file';

            expect(Updater.validateStackDefinitionFile(string)).toBe(string);
        });

        test('Throws an error if empty string is given', () => {
            expect(call('')).toThrow('Invalid <stack_file>');
        });

        test('Throws an error if nothing is given', () => {
            expect(call(undefined)).toThrow('Invalid <stack_file>');
        });
    });

    describe('validateStackName()', () => {
        let call = argument => Updater.validateStackName.bind(Updater, argument);

        test('Returns a string if a valid string is given', () => {
            let string = 'test-file';

            expect(Updater.validateStackName(string)).toBe(string);
        });

        test('Throws an error if empty string is given', () => {
            expect(call('')).toThrow('Invalid <stack_name>');
        });

        test('Throws an error if nothing is given', () => {
            expect(call(undefined)).toThrow('Invalid <stack_name>');
        });
    });

    describe('verifyRequiredVariables()', () => {
        beforeEach(() => {
            delete process.env.PORTAINER_URL;
            delete process.env.PORTAINER_USERNAME;
            delete process.env.PORTAINER_PASSWORD;
        });

        afterAll(() => {
            process.env.PORTAINER_URL = '';
            process.env.PORTAINER_USERNAME = '';
            process.env.PORTAINER_PASSWORD = '';
        });

        test('Returns nothing if variables have values', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(Updater.verifyRequiredVariables()).not.toBeDefined();
        });

        test('Throws an error if PORTAINER_URL is an empty string', () => {
            process.env.PORTAINER_URL = '';
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(Updater.verifyRequiredVariables).toThrow('Missing the "PORTAINER_URL" environment variable');
        });

        test('Throws an error if PORTAINER_URL is not given', () => {
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(Updater.verifyRequiredVariables).toThrow('Missing the "PORTAINER_URL" environment variable');
        });

        test('Throws an error if PORTAINER_USERNAME is an empty string', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = '';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(Updater.verifyRequiredVariables).toThrow('Missing the "PORTAINER_USERNAME" environment variable');
        });

        test('Throws an error if PORTAINER_USERNAME is not given', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(Updater.verifyRequiredVariables).toThrow('Missing the "PORTAINER_USERNAME" environment variable');
        });

        test('Throws an error if PORTAINER_PASSWORD is an empty string', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = '';

            expect(Updater.verifyRequiredVariables).toThrow('Missing the "PORTAINER_PASSWORD" environment variable');
        });

        test('Throws an error if PORTAINER_PASSWORD is not given', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = 'test';

            expect(Updater.verifyRequiredVariables).toThrow('Missing the "PORTAINER_PASSWORD" environment variable');
        });
    });

    describe('async getStackByStackName()', () => {
        beforeAll(() => {
            PortainerApi.Stacks.getAllStacks = jest.fn(() => [
                { Name: 'Test1', Hello: 'World 1' },
                { Name: 'Test2', Hello: 'World 2' },
                { Hello: 'World 3' }
            ]);
        });

        test('Returns object if stack exists', async () => {
            expect(await Updater.getStackByStackName('Test1')).toEqual({ Name: 'Test1', Hello: 'World 1' });
        });

        test('Throws error if stack does not exists', async () => {
            let stackName = 'invalid';

            try {
                expect(await Updater.getStackByStackName(stackName)).not.toHaveReturned();
            } catch (err) {
                expect(err.message).toBe(`Stack "${stackName}" not found`);
            }
        });
    });

    describe('async getStackDefinitionByFile()', () => {
        test('Returns file contents if file exists', async () => {
            expect(await Updater.getStackDefinitionByFile('package.json')).toEqual(
                expect.stringContaining('Tool to assist on Portainer stack updates')
            );
        });

        test('Throws error if file does not exists', async () => {
            let filename = 'invalid_file';

            try {
                expect(await Updater.getStackDefinitionByFile(filename)).not.toHaveReturned();
            } catch (err) {
                expect(err.message).toBe(`ENOENT: no such file or directory, open '${filename}'`);
            }
        });
    });

    describe('async getStackDefinitionByStackId()', () => {
        test('Returns definition if found', async () => {
            let stackContent = 'test stack content';
            PortainerApi.Stacks.getStackFile = jest.fn(() => ({ StackFileContent: stackContent }));

            expect(await Updater.getStackDefinitionByStackId('1')).toBe(stackContent);
        });

        test('Throws error if not found', async () => {
            PortainerApi.Stacks.getStackFile = jest.fn();

            try {
                expect(await Updater.getStackDefinitionByStackId('')).not.toHaveReturned();
            } catch (err) {
                expect(err.message).toBe('Unable to retrieve current Stack Definition');
            }
        });
    });

    describe('async updateStack()', () => {
        beforeAll(() => {
            PortainerApi.Stacks.updateStack = jest.fn(() => 'called');
        });

        test('Updates the stack if definition has changed', async () => {
            Updater.getStackByStackName = jest.fn(() => ({ Id: 1 }));
            Updater.getStackDefinitionByStackId = jest.fn(() => 'oldDefinition');
            Updater.getStackDefinitionByFile = jest.fn(() => 'newDefinition');

            let result = await Updater.updateStack('test-stack', 'test-file');
            expect(result).toBeDefined();

            expect(PortainerApi.Stacks.updateStack).toHaveBeenCalled();
            expect(Updater.getStackDefinitionByStackId).toHaveBeenCalled();
            expect(Updater.getStackDefinitionByFile).toHaveBeenCalled();
        });

        test('Does nothing if definition has not changed', async () => {
            Updater.getStackByStackName = jest.fn(() => ({ Id: 1 }));
            Updater.getStackDefinitionByStackId = jest.fn(() => 'equalDefinition');
            Updater.getStackDefinitionByFile = jest.fn(() => 'equalDefinition');

            let result = await Updater.updateStack('test-stack', 'test-file');
            expect(result).not.toBeDefined();

            expect(PortainerApi.Stacks.updateStack).not.toHaveBeenCalled();
            expect(Updater.getStackDefinitionByStackId).toHaveBeenCalled();
            expect(Updater.getStackDefinitionByFile).toHaveBeenCalled();
        });

        test('Updates the stack if update is forced,e vent if definition is the same', async () => {
            Updater.getStackByStackName = jest.fn(() => ({ Id: 1 }));
            Updater.getStackDefinitionByStackId = jest.fn(() => 'equalDefinition');
            Updater.getStackDefinitionByFile = jest.fn(() => 'equalDefinition');
            Updater.parseForceUpdate = jest.fn(() => true);

            let result = await Updater.updateStack('test-stack', 'test-file');
            expect(result).toBeDefined();

            expect(PortainerApi.Stacks.updateStack).toHaveBeenCalled();
            expect(Updater.getStackDefinitionByFile).toHaveBeenCalled();

            // Since this is only present on the second part of the if statement, it's not called
            expect(Updater.getStackDefinitionByStackId).not.toHaveBeenCalled();
        });
    });
});
