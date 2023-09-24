const Quotes = require('../../models/quotes.model.js');

module.exports = {
    async deleteQuote (req, res) {
        const { uuid } = req.params;

        const quotesData = await Quotes.findOne({ where: { uuid }})

        if (!quotesData) return res.status(404).json({status: 'Not Found', message: 'Quote not found!'});
        try {
            await quotesData.destroy();
            res.status(200).json({status: 'success', message: 'Quote has been deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json({status: 'Internal Server Error', message: err.message})
        }
    }
}