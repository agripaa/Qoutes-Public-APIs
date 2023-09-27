const express = require('express');
const Quote = require('./routes/quotes.route.js');
const db = require('./config/database.js');
const cors = require('cors');

require('dotenv').config();
const app = express();

(async () => {db.sync()})();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.status(200).json({status: 'Success', message: 'Server has been activated'});
})
app.use(Quote);

app.listen(process.env.PORT_SERVER, () => {
    console.log(`listening on port http://localhost:${process.env.PORT_SERVER}`)
});

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
module.exports = allowCors(handler)
module.exports = app;