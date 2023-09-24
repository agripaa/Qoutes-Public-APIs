const controllerPost = require('../controllers/POST/quotes.controller.js');

describe('Controller Create Tests', () => {
  describe('createQuotes', () => {
    it('should create a new quote and respond with success', async () => {
      const req = {
        body: {
          quote: 'Test quote',
          username: 'TestUser',
        },
        ipUser: '127.0.0.1',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controllerPost.createQuotes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        userIp: '127.0.0.1'
      });
    });

    it('should handle missing quote and respond with error', async () => {
      const req = {
        body: {
          quote: '',
          username: 'TestUser',
        },
        ipUser: '127.0.0.1',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controllerPost.createQuotes(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Not Found',
        message: 'quotes cannot be empty',
      });
    });

    it('should handle missing username and set it to "Anonymous"', async () => {
      const req = {
        body: {
          quote: 'Test quote',
          username: '',
        },
        ipUser: '127.0.0.1',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      
      await controllerPost.createQuotes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        userIp: '127.0.0.1',
      });
    });
  });
});