import mongoose from "mongoose";
// import connectToTestDB from "./src/server/testDatabase";
import { MongoMemoryServer } from "mongodb-memory-server";
// File for creating, starting, and connecting to mock mongo server 

let mongoServer;

beforeAll(async() => {
  // console.log('Waiting to connect to Test DB...')
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri, { dbName: 'TestUserDB' })
  // console.log('Connected to Test DB from jest.setup.js!')
});

afterAll(async() => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

