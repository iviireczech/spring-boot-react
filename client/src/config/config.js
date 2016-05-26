module.exports = {
    clientId: 'web',
    clientSecret: '6b7b5d6028865dc2901f0b0db64cb291',
    apiHost: process.env.API_HOST || 'localhost',
    apiPort: process.env.API_PORT,
    apiUrl: 'http://' + (process.env.API_HOST || 'localhost') + (process.env.API_PORT ? ':' + process.env.API_PORT : '')
};