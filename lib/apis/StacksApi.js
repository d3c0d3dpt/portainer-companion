module.exports = clientGetter => ({
    /**
     * Shorthand for the GET request
     * @param {string} apiPath
     * @param {Object} requestData
     * @returns {Promise<*>}
     * @private
     */
    async _get (apiPath, requestData = {}) {
        return clientGetter().callApiWithKey('GET', apiPath, requestData);
    },

    /**
     * Shorthand for the PUT request
     * @param {string} apiPath
     * @param {Object} requestData
     * @returns {Promise<*>}
     * @private
     */
    async _put (apiPath, requestData = {}) {
        return clientGetter().callApiWithKey('PUT', apiPath, requestData);
    },

    /**
     * Returns a list of defined stacks
     * @returns {Promise<*>}
     */
    async getAllStacks () {
        return this._get('/api/stacks');
    },

    /**
     * Returns the Stack Definition File for a stack
     * @param stackId
     * @returns {Promise<*|Promise<*>>}
     */
    async getStackFile (stackId) {
        return this._get(`/api/stacks/${stackId}/file`);
    },

    /**
     * Updates a stack
     * @param {string} Id
     * @param {string} EndpointId
     * @param {string} StackFileContent
     * @param {Object} Env
     * @param {boolean} Prune
     * @returns {Promise<*|Promise<*>>}
     */
    async updateStack ({ Id, EndpointId }, StackFileContent, Env = [], Prune = false) {
        return this._put(
            `/api/stacks/${Id}?endpointId=${EndpointId}`,
            { StackFileContent, Env, Prune }
        );
    }
});
