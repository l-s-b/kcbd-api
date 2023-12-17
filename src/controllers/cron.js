const tasks = require('node-cron');

const cron = () => {
    const keepAliveCron = tasks.schedule('* */12 * * *', () => {
        console.log('*** 12-hour keep-alive cron execution ***');
    });

    keepAliveCron.start();
}

module.exports = { cron }