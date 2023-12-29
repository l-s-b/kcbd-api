// In current container service (Back4App), actual HTTP requests should be made every less than 30 minutes
// Or else the container will hibernate. This cron aims at solving that issue.
const tasks = require('node-cron');
const { getProducts } = require('./products');

const cron = () => {
    const keepAliveCron = tasks.schedule('*/2 * * * *', () => {
        console.log('*** 2-minute keep-alive GET request: ***');
        getProducts();
    });

    keepAliveCron.start();
}

module.exports = { cron }