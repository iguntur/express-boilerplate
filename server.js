'use strict';
const http = require('http');
const app = require('./bootstrap/app');

const port = app.get('port');

http.createServer(app).listen(port);
