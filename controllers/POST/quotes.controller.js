const Quotes = require('../../models/quotes.model.js');

module.exports = {
    async createQuotes(req, res) {
        let {quote, username} = req.body;
        const { ipUser } = req;

        if (!quote) return  res.status(404).json({status: 'Not Found', message: 'quotes cannot be empty'})
        if (!username) username = 'Anonymous'

        try {
            await Quotes.create({
                quote: quote,
                username: username,
            });
            
            res.status(200).json({status: 'success', userIp: ipUser});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'Internal Server Error', error: err.message});
        }
    }
}