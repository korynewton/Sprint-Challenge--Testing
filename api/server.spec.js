//Server Testing

const request = require('supertest');
const server = require('./server');

describe('Server', () => {
  describe('GET testing', () => {
    it('should return status code 200', async () => {
      const res = await request(server).get('/games');
      expect(res.status).toBe(200);
    });
    it('should return an array', async () => {
      const res = await request(server).get('/games');
      const array = Array.isArray(res.body);
      expect(array).toBeTruthy();
    });
    it('should return json', async () => {
      const res = await request(server).get('/games');
      expect(res.type).toBe('application/json');
    });
  });
  describe('POST Testing', () => {});
});
