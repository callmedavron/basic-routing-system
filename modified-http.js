const http = require('http');

/** Create an Object with http.ServerResponse prototype **/
const responseProto = Object.create(http.ServerResponse.prototype);

/** Create json from object **/
const makeJson = data => JSON.stringify(data);

/** add `send` method to prototype of http.ServerResponse **/
responseProto.send = function (data, {status = 200, contentType = 'text/html'} = {}) {
    this.writeHead(status, {'Content-Type': contentType});
    this.write(data);
    this.end();
};

/** add `json` method to prototype of http.ServerResponse **/
responseProto.json = function (data, {status = 200, contentType = 'application/json'} = {}) {
    this.writeHead(status, {'Content-Type': contentType});
    this.write(makeJson(data));
    this.end();
};

/** add `notFound` method to prototype of http.ServerResponse **/
responseProto.notFound = function (data, {status = 404, contentType = 'text/html'} = {}) {
    this.writeHead(status, {'Content-Type': contentType});
    this.write(data);
    this.end();
};

/** add `onlyHeader` method to prototype of http.ServerResponse **/
responseProto.onlyHeader = function ({status = 200, contentType = 'text/html'} = {}) {
    this.writeHead(status, {'Content-Type': contentType} );
    this.end();
};

/** assign `proto` with  `http.ServerResponse.prototype` **/
Object.assign(http.ServerResponse.prototype, responseProto);
module.exports = http;