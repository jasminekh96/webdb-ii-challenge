const express = require('express');

const carsRouter = require('./cars/cars-router');

const server = express();

function logger(req, res, next) {
	console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
	next();
}
server.use(logger);
server.use(express.json());

server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
	res.send(`<h1>She works!</h2>`);
});
module.exports = server;
