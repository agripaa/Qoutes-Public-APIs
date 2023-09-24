const controllerPatch = require('../controllers/PATCH/quotes.controller.js');

describe('Controller Patch Tests', () => {
    describe('patchQuotes', () => {
        it('should patch some quote', async () => {
            const req = {
                body: {
                    quote: 'Ini data testing update',
                    username: 'test123'
                },
                ipUser: '127.0.0.1',
                params: {
                    uuid: '2a14bef4-dba1-444d-8248-8a3547555718'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            await controllerPatch.updateQuotes(req, res);

            const {status, json} = res;
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                status: 'success',
                userIp: req.ipUser,
                message: 'quotes updated successfully!'
            });
        });
        
        it('should handle not found that quote uuid', async () => {
            const req = {
                body: {
                    quote: 'Ini data testing update',
                    username: 'test123'
                },
                ipUser: '127.0.0.1',
                params: {
                    uuid: 'xxx'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            await controllerPatch.updateQuotes(req, res);

            const {status, json} = res;
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({
                status: 'Not Found',
                message: 'Qoute not found!',
            });
        })

        it('should handle of error for quote is a null value', async () => {
            const req = {
                body: {
                    quote: '',
                    username: 'test123'
                },
                ipUser: '127.0.0.1',
                params: {
                    uuid: '2a14bef4-dba1-444d-8248-8a3547555718'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            await controllerPatch.updateQuotes(req, res);

            const {status, json} = res;
            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith({
                status: 'Not Found',
                message: 'Quote cannot be empty',
            });
        })

        it('should add the username to the Anonymous if user is not insert value in body', async () => {
            const req = {
                body: {
                    quote: 'Hallo ini test 123',
                    username: ''
                },
                ipUser: '127.0.0.1',
                params: {
                    uuid: '2a14bef4-dba1-444d-8248-8a3547555718'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            await controllerPatch.updateQuotes(req, res);

            const {status, json} = res;
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                status: 'success',
                userIp: req.ipUser,
                message: 'quotes updated successfully!'
            });
        })
    })
})