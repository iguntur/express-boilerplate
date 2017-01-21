'use strict';
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const config = require('vevo-config');
const bodyParser = require('body-parser');

const app = express();

// App
app.set('port', config.get('app.port'));
// app.use(logger()); // logger with morgan
app.use(express.static(path.resolve('public'))); // Static
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((request, response, next) => {
	// response.removeHeader('X-Powered-By'); // uncomment if you want
	next();
});

// Access variable in view
app.use((req, res, next) => {
	res.locals.currentUrl = req.url;
	next();
});

// View
app.set('view engine', config.get('view.engine'));
app.set('views', path.resolve(config.get('view.path')));
app.locals.pretty = config.get('view.pretty');
app.locals.basedir = path.resolve(config.get('view.basedir') || config.get('view.path'));

// Boostrapping routes FILEs
fs.readdirSync('./routes').forEach(route => {
	route = require(path.resolve('routes', route));
	if (typeof route === 'function') {
		app.use(route);
	}
});

module.exports = app;
