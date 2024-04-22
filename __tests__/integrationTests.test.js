import app from '../src/server/server';
import request from 'supertest';
import mongoose from 'mongoose';
import userModel from '../src/server/models/userModel';

describe('Application Loads Up Properly', () => {
  it('Should load home page and return 200', async() => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Session Verification on Load (Failed)', () => {
  it('Should return 401, inactive session', async() => {
    const response = await request(app).get('/api/auth/verify-session');
    expect(response.status).toBe(401);
  });
});

describe('Account sign-up should create new MongoDB Document', () => {
  it('Should return 201, and create new account in database', async () => {
    // Define user data
    const userData = {
      username: 'testUser',
      password: 'testPassword123',
    };

    // Create user
    const createUserResponse = await request(app)
      .post('/api/user/sign-up')
      .send(userData);

    // Check if user creation was successful
    expect(createUserResponse.status).toBe(201);
  })
})

describe('Sign-in should start a session and authenticate user', () => {
  it('Should create and retrieve a user from the in-memory database', async () => {
    // Define user data
    const userData = {
      username: 'testUser',
      password: 'testPassword123',
    };

    // Create user
    const createUserResponse = await request(app)
      .post('/api/user/sign-up')
      .send(userData);

    // Check if user creation was successful
    expect(createUserResponse.status).toBe(201);
  })
})