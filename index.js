require('dotenv').config();
const server = require('./src/app');
const db = require('./src/db/associations');
const {SERVER, PORT, DB_RESET} = process.env;
const axios = require('axios');

db.sync(DB_RESET).then(() => {
    server.listen(PORT, async () => {
        console.log(`KCBD App on, listening on port ${PORT}`);
        //BULK CREATE
        if (DB_RESET.force) await axios.post(`${SERVER}/bulk`);
    })
});
