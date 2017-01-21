'use strict';
const route = require('express').Router();

route.get('/', (request, response) => {
	return response.render('home');
});

module.exports = route;
