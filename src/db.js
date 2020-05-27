// Util is handy to have around, so thats why that's here.
const util = require('util')
// and so is assert
const assert = require('assert');
// Now lets get cfenv and ask it to parse the environment variable
const cfenv = require('cfenv');

// load local VCAP configuration  and service credentials
let vcapLocal;
try {
    vcapLocal = require('../vcap-local.json');
    console.log("Loaded local VCAP");
} catch (e) {
    // console.log(e)
}

const appEnvOpts = vcapLocal ? {
    vcap: vcapLocal
} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);
let services = appEnv.services;
// The services object is a map named by service so we extract the one for MongoDB

// let mongodbServices = services["databases-for-mongodb"];
let mongodbServices = services['user-provided']
// This check ensures there is a services for MongoDB databases
assert(!util.isUndefined(mongodbServices), "App must be bound to databases-for-mongodb service");
let mongodbConn = mongodbServices[0].credentials.connection.mongodb;

// Read the CA certificate and assign that to the CA variable
let ca = [Buffer.from(mongodbConn.certificate.certificate_base64, 'base64')];

// We always want to make a validated TLS/SSL connection
let options = {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    useUnifiedTopology: true,
    useNewUrlParser: true
};

// Extract the database username and password
let authentication = mongodbConn.authentication;
let username = authentication.username;
let password = authentication.password;

// Extract the MongoDB URIs
let connectionPath = mongodbConn.hosts;
let connectionString = `mongodb://${username}:${password}@${connectionPath[0].hostname}:${connectionPath[0].port},${connectionPath[1].hostname}:${connectionPath[1].port}/?replicaSet=replset/cendant`;

export {connectionString, options}