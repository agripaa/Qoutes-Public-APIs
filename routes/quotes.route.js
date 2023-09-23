const express = require('express');
const { getQuotes, getQuotesUUID } = require('../controllers/GET/quotes.controller.js');
const { createQuotes } = require('../controllers/POST/quotes.controller.js');
const { handlerIp } = require('../middleware/ip.middleware.js');
const { checkLimitRequest } = require('../middleware/checkLimitRequest.middleware.js');

const router = express.Router();

router.get('/quotes', handlerIp, checkLimitRequest, getQuotes);
router.get('/quotes/:uuid', handlerIp, checkLimitRequest, getQuotesUUID);
router.post('/quotes/upload', handlerIp, createQuotes);

module.exports = router;