const Quotes = require('../../models/quotes.model.js');

module.exports = {
    async updateQuotes (req, res) {
        const { ipUser } = req;
        const { uuid } = req.params;
        let { quote, username } = req.body;

        const quoteData = await Quotes.findOne({ where: { uuid }})

        if (!quoteData) return res.status(404).json({ status: 'Not Found', message: 'Qoute not found!' });

        if (!quote) return  res.status(404).json({status: 'Not Found', message: 'Quote cannot be empty'})
        if (!username) username = 'Anonymous'

        try {
            await Quotes.update({
                quote,
                username,
            },{where: {uuid}});
            res.status(200).json({status: 'success', userIp: ipUser, message: 'quotes updated successfully!'})
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'Internal Server Error', message: err.message})
        }
    }
}