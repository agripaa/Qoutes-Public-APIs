const db = require('../../config/database.js');
const Quotes = require('../../models/quotes.model.js');

module.exports = {
    async getQuotes (req, res) {
        const { limit } = req.query;
        const { ipUser } = req;

        const limitInt = parseInt(limit);

        if (limitInt >= 100) return res.status(400).json({status: 'Bad Request', message: "Limit exceeded maximum allowed"});

        try {
            const quotes =  await Quotes.findAll({
                order: db.random(),
                limit: limitInt || 1
            });

            if (!quotes) return res.status(404).json({status: 'Not Found', data: { message: 'quotes data not found please create a new data quotes', limit: limitInt || 1, userIp: ipUser, }});
            res.status(200).json({status: 'success', data: { limit: limitInt || 1, userIp: ipUser, data : quotes, }});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'Internal Server Error', error: err.message});
        }
    },
    async getQuotesUUID (req, res) {
        const { uuid } = req.params;
        const { ipUser } = req;
        
        try {
            const quote = await Quotes.findOne({
                where: {
                    uuid: uuid
                },
                exclude: ['uuid']
            });

            if (!quote) return res.status(404).json({status: 'Not Found', data: { message: 'data quotes uuid is not exist', uuid: uuid, userIp: ipUser, }});
            res.status(200).json({status: 'success', data: { uuid: uuid, userIp: ipUser, data : quote, }});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'Internal Server Error', error: err.message});
        }
    }
}