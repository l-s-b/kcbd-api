const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = require('./routes')
const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(router)

module.exports = server;