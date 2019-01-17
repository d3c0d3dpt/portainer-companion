// Mock this module - we don't want the real class to be loaded
jest.mock('portainer-api-client', () => class {});

const PortainerApi = require('../../../lib/PortainerApi');

describe('lib/PortainerApi.js', () => {
    describe('getClient()', () => {
        beforeEach(() => {
            delete process.env.PORTAINER_URL;
            delete process.env.PORTAINER_USERNAME;
            delete process.env.PORTAINER_PASSWORD;
        });

        test('Returns nothing if variables have values', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(PortainerApi.getClient()).toBeDefined();
        });

        test('Throws an error if PORTAINER_URL is an empty string', () => {
            process.env.PORTAINER_URL = '';
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(PortainerApi.getClient).toThrow('Missing the "PORTAINER_URL" environment variable');
        });

        test('Throws an error if PORTAINER_URL is not given', () => {
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(PortainerApi.getClient).toThrow('Missing the "PORTAINER_URL" environment variable');
        });

        test('Throws an error if PORTAINER_USERNAME is an empty string', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = '';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(PortainerApi.getClient).toThrow('Missing the "PORTAINER_USERNAME" environment variable');
        });

        test('Throws an error if PORTAINER_USERNAME is not given', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_PASSWORD = 'test';

            expect(PortainerApi.getClient).toThrow('Missing the "PORTAINER_USERNAME" environment variable');
        });

        test('Throws an error if PORTAINER_PASSWORD is an empty string', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = 'test';
            process.env.PORTAINER_PASSWORD = '';

            expect(PortainerApi.getClient).toThrow('Missing the "PORTAINER_PASSWORD" environment variable');
        });

        test('Throws an error if PORTAINER_PASSWORD is not given', () => {
            process.env.PORTAINER_URL = 'test';
            process.env.PORTAINER_USERNAME = 'test';

            expect(PortainerApi.getClient).toThrow('Missing the "PORTAINER_PASSWORD" environment variable');
        });
    });
});
