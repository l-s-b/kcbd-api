require('dotenv').config();
const server = require('./src/app');
const db = require('./src/db/associations');
const {SERVER, PORT} = process.env;
const axios = require('axios');

const RESET_DB = { force: false };

db.sync(RESET_DB).then(() => {
    server.listen(PORT, async () => {
        console.log(`KCBD App on, listening on port ${PORT}`);
        //BULK CREATE
        if (RESET_DB.force) await axios.post(`${SERVER}/bulk`);
    })
});
