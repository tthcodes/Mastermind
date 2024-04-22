import app from '../src/server/server';
import request from 'supertest';

// Consideration: it would probably be better practice to do data cleanup before each describe block
  // to improve test reliability and isolation... 
  // For now, only doing in-memory database cleanup after all tests ran

// Consideration: could also have added negative testing and error handling tests..

describe('Application Loads Up Properly', () => {
  it('Should load home page and return 200', async() => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Session Verification on Load (Not Logged In)', () => {
  it('Should return 401 status and inactive session message', async() => {
    const response = await request(app).get('/api/auth/verify-session');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Session is inactive');
  });
});

describe('Account sign-up should create new MongoDB Document', () => {
  it('Should return 201, and create new account in database', async () => {
    // Define user data
    const userData = {
      username: 'testUser',
      password: 'testPassword123',
    };

    // Create user in MongoDB instance
    const createUserResponse = await request(app)
      .post('/api/user/sign-up')
      .send(userData);

    // Check if user creation was successful
    expect(createUserResponse.status).toBe(201);
  });
});

describe('All requests that initialize or require user authentication', () => {
  // Initiate agent for storing session data for MongoDB instance
  const agent = request.agent(app);
  
  // Define user data
    const userData = {
      username: 'testUser',
      password: 'testPassword123',
    };

  it('Should sign user in and return 200', async () => {

    // Post request to sign in
    const signInResponse = await agent
      .post('/api/user/login')
      .send(userData)
    
    // Check if user sign in was successful
    expect(signInResponse.status).toBe(200)
  });

  it('User Verification on Load Should be Successful (Logged In)', async () => {
    // Make get request to verify session endpoint
    const verifiedResponse = await agent.get('/api/auth/verify-session');
    expect(verifiedResponse.status).toBe(200);
    expect(verifiedResponse.body.message).toBe('Session is active');
  });

  it('Should get user data on page load', async () => {

    // Make get request to get user data endpoint, compare returned document to username
    const getDataResponse = await agent.get('/api/user/get-user-data');
    expect(getDataResponse.status).toBe(200);

    // OBJECT SENT BACK FROM AGENTS ARE DIFFERENT FROM RESPONSE OBJECT. _body to access response body
    expect(getDataResponse._body.username).toBe(userData.username);
  });

  it('Logged in user should be able to change password', async () => {

    // Make patch request to change password, send old and new password
    const changePasswordResponse = await agent
      .patch('/api/user/change-password')
      .send({ oldPassword: 'testPassword123', newPassword: 'newPassword123' })

    // Make sure response status is 200
    expect(changePasswordResponse.status).toBe(200);

    // Make sure response body message matches that sent from change password route
    expect(changePasswordResponse._body.message).toBe('Password successfully changed!');
  });

  it('Logged in user score should update on win condition', async () => {

    // Obtain initial user score before patch request by calling getUserData
    const beforeUpdateResponse = await agent.get('/api/user/get-user-data');
    expect(beforeUpdateResponse.status).toBe(200);

    // Save initial score before update
    const initialScore = beforeUpdateResponse._body.userScore;
    
    // Make patch request to get update user score on win
    const updateScoreResponse = await agent
      .patch('/api/user/update-score')

    // Make sure response status is 200
    expect(updateScoreResponse.status).toBe(200);

    // Obtain score after update
    const afterUpdateResponse = await agent.get('/api/user/get-user-data');
    expect(afterUpdateResponse.status).toBe(200);

    const newScore = initialScore + 1;

    // Make sure response body holding new score matches score  sent from update-score route
    expect(updateScoreResponse._body.message).toBe(`Congratulations, scored updated! New score: ${newScore}!`);
  });

  it('Logged in user should be able to log out', async () => {

    // Post request to logout route
    const logoutResponse = await agent.post('/api/user/logout');

    // Make sure response is 200
    // Make sure logout message is present as successful
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse._body.message).toBe('Logout successful.');
  });

  it('Logged in user should be able to delete account', async () => {

    // Post request to sign user back in using new updated password
    const signInResponse2 = await agent
        .post('/api/user/login')
        .send({ username: userData.username, password: 'newPassword123' })
      
    // Check if user sign in was successful
    expect(signInResponse2.status).toBe(200)

    // Delete request to delete user's account after sign in
    const deleteAccountResponse = await agent
      .delete('/api/user/delete-account')
      .send({ deletePassword: 'newPassword123' })

    // Make sure response is 200
    // Make sure delete account message is present as successful
    expect(deleteAccountResponse.status).toBe(200);
    expect(deleteAccountResponse._body.message).toBe('Account deleted.');
  });
});

describe('Play page successfully generates valid random combination as answer', () => {

  // Check if returned response body is an array
  it('Should generate an array', async() => {
    const generatedAnswerResponse = await request(app).get('/api/generate-answer/?length=4&min=0&max=7');
    expect(Array.isArray(generatedAnswerResponse._body)).toBe(true);
  });

  // Check that all elements in that array are integers
  it('Array returned should contain only integers', async() => {
    const generatedAnswerResponse = await request(app).get('/api/generate-answer/?length=4&min=0&max=7');
    let allNumbers = generatedAnswerResponse._body.every(el => typeof el === 'number');
    expect(allNumbers).toBe(true);
  });

  // Check if generated answer numbers are between 0 and 7
  it('Array returned should contain a min of 0 and a max of 7', async() => {
    const generatedAnswerResponse = await request(app).get('/api/generate-answer/?length=4&min=0&max=7');
    let answerArr = generatedAnswerResponse._body;
    expect(Math.min(...answerArr) >= 0).toBe(true);
    expect(Math.max(...answerArr) <= 7).toBe(true);
  });
});