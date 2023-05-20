require('dotenv').config();
const server = require('./src/app');
const db = require('./src/db/associations');
const {SERVER, PORT, DB_RESET} = process.env;
const axios = require('axios');
console.log(`${SERVER}
${PORT}
${DB_RESET}`);
let RESET = JSON.parse(DB_RESET);

db.sync(RESET).then(() => {
    server.listen(PORT, async () => {
        console.log(`KCBD App on, listening on port ${PORT}`);
        //BULK CREATE
        if (RESET.force) await axios.post(`${SERVER}/bulk`);
    })
});
