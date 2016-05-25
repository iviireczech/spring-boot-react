module.exports = {
    apiHost: process.env.API_HOST || 'localhost',
    apiPort: process.env.API_PORT,
    apiUrl: 'http://' + (process.env.API_HOST || 'localhost') + (process.env.API_PORT ? ':' + process.env.API_PORT : '')
};