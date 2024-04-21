// import app from '../src/server/server';
import request from 'supertest';
import app from '../src/server/server';

describe('GET /', () => {
  it('Should load home page and return 200', async() => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
