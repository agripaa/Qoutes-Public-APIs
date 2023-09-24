const controllerDelete = require('../controllers/DELETE/quotes.controller.js');

describe('Controller delete Tests', () => {
    describe('deleteQuotes', () => {
        it('should delete some quote', async () => {
            const req = { params: {uuid: '0af1a879-3e95-433a-8320-3ae7438ffc138'}}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await controllerDelete.deleteQuote(req, res)

            const { status, json } = res;
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Quote has been deleted!'
            });
        })

        it('should uuid for quote data is not found', async () => {
            const req = { params: {uuid: 'xxxx'}};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await controllerDelete.deleteQuote(req, res)

            const { status, json } = res;
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({
                status: 'Not Found',
                message: 'Quote not found!'
            });
        })
    })
})