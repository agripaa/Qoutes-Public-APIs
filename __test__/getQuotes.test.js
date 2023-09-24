const controllerGet = require('../controllers/GET/quotes.controller.js'); 

describe('Controller Get Tests', () => {
    describe('getQuotes', () => {
        it('should handle valid requests and return success', async () => {
                const req = {
                query: {
                    limit: '10'
                },
                ipUser: '127.0.0.1'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await controllerGet.getQuotes(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: {
                    limit: 10,
                    userIp: '127.0.0.1',
                    data: expect.any(Array)
                }
            });
        });

        it('should handle limit exceeding and return 403', async () => {
        const req = {
            query: {
            limit: '100'
        },
        ipUser: '127.0.0.1'
    };
    const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        await controllerGet.getQuotes(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'Bad Request',
            message: 'Limit exceeded maximum allowed'
        });
    });
});

describe('getQuotesUUID', () => {
        it('should handle valid request and return success', async () => {
        const req = {
            params: {
                uuid: 'b83137cd-b98b-4846-8b6c-a629209f9f36'
            },
            ipUser: '127.0.0.1'
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controllerGet.getQuotesUUID(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: {
                uuid: 'b83137cd-b98b-4846-8b6c-a629209f9f36',
                userIp: '127.0.0.1',
                data: expect.any(Object)
            }
        });
    });
    
    it('should handle invalid uuid and return 404', async () => {
        const req = {
            params: {
                uuid: 'xxxx'
            },
            ipUser: '127.0.0.1'
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controllerGet.getQuotesUUID(req, res);
        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
                status: 'Not Found',
                data: {
                    message: 'data quotes uuid is not exist',
                    uuid: 'xxxx',
                    userIp: '127.0.0.1'
                }
            });
        });
    });
});

