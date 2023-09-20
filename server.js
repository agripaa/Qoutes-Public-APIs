const express = require('express');
const Quote = require('./routes/quotes.route.js');
const db = require('./config/database.js');

require('dotenv').config();
const app = express();

(async () => {db.sync()})();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Activity')
})
app.use(Quote);

app.listen(process.env.PORT_SERVER, () => {
    console.log(`listening on port http://localhost:${process.env.PORT_SERVER}`)
})

module.exports = app;