const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/');

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe('GET /api/snacks', () => {
  test('status:200, responds with an array of snack objects', () => {
    return request(app)
      .get('/api/snacks')
      .expect(200)
      .then(({ body }) => {
        const { snacks } = body;
        expect(snacks).toBeInstanceOf(Array);
        expect(snacks).toHaveLength(6);
        snacks.forEach((snack) => {
          expect(snack).toMatchObject({
            snack_id: expect.any(Number),
            snack_name: expect.any(String),
            snack_description: expect.any(String)
          });
        });
      });
  });
});

describe('GET /api/drinks/drink_id', () => {
  test('200: responds with the requested drink data', () => {
    return request(app)
      .get('/api/drinks/1')
      .expect(200)
      .then(({ body }) => {
        const { drink } = body;
        expect(drink).toEqual({
          drink_id: 1,
          drink_name: 'Vimto',
          drink_description: `Manchester's finest`
        });
      });
  });
});

describe('POST: /api/snacks', () => {
  test('201: responds with the snack object that has been added', () => {
    const newSnack = {
      snack_name: 'Party Ring',
      snack_description: `Because it''s Party time`
    };
    return request(app)
      .post('/api/snacks')
      .send(newSnack)
      .expect(201)
      .then(({ body }) => {
        const { snack } = body;
        expect(snack).toEqual({
          snack_id: 7,
          ...newSnack
        });
      });
  });

  test('400: bad request when no body is sent', () => {
    return request(app)
      .post('/api/snacks')
      .expect(400)
      .then((response) => {
        const msg = response.body.msg;
        expect(msg).toBe('you did a bad request not my problem');
      });
  });
});
