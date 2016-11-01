const addedHostname = '';

const prepend = 'http://';
const localhost = 'http://localhost';
const serverPort = '3000';
const url = prepend + ( addedHostname ? addedHostname : hostname ) + ":" + serverPort;

process.env.BASE_URL = url;

