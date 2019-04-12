//Server Testing

const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('Server', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

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
  describe('POST Testing', () => {
    it('should return status 422 if incomplete object is sent', async () => {
      const res = await request(server)
        .post('/games')
        .send({ title: 'Mario Kart' });
      expect(res.status).toBe(422);
    });
    it('should return status 202', async () => {
      const completeObj = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      };
      const res = await request(server)
        .post('/games')
        .send(completeObj);

      expect(res.status).toBe(202);
    });
    it('should return obj that was added', async () => {
      const completeObj = {
        title: 'Halo',
        genre: '1st person shooter',
        releaseYear: 2001,
      };
      const res = await request(server)
        .post('/games')
        .send(completeObj);

      expect(res.body.title).toBe('Halo');
      expect(res.body.genre).toBe('1st person shooter');
      expect(res.body.releaseYear).toBe('2001');
    });
  });
});
