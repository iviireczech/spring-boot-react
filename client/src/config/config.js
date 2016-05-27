const serverHost = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT;
const serverUrl = 'http://' + serverHost + (serverPort ? ':' + serverPort : '');

module.exports = {
    clientId: 'web',
    clientSecret: '6b7b5d6028865dc2901f0b0db64cb291',
    tokenUrl: serverUrl + '/oauth/token',
    apiUrl: serverUrl + '/api'
};