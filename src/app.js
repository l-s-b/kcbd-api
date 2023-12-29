const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = require('./routes')
const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(async function(req, res, next) {
  const allowedOrigins = ['http://localhost:3000', 'https://kundalinicbd.com', 'https://kundalinicbd.vercel.app'];
  const requestOrigin = req.headers.origin;

  if (allowedOrigins.includes(requestOrigin)) {
    await res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    await res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    await res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    await res.setHeader('Access-Control-Allow-Credentials', true);
  }

  next();
})
server.use(morgan("dev"));
server.use(router)

module.exports = server;