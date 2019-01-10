module.exports = (client) => ({
    async _get(apiPath, requestData = {}) {
        return client.callApiWithKey('GET', apiPath, requestData)
    },

    async _put(apiPath, requestData = {}) {
        return client.callApiWithKey('PUT', apiPath, requestData)
    },

    async getAllStacks() {
        return this._get('/api/stacks')
    },

    async getStackFileContent (stackId) {
        return this._get(`/api/stacks/${stackId}/file`);
    },

    async updateStack(stackId, endpointId, StackFileContent, Env = [], Prune = false) {
        return this._put(
            `/api/stacks/${stackId}?endpointId=${endpointId}`,
            { StackFileContent, Env, Prune }
        )
    }
});
