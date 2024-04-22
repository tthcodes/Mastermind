import mongoose from "mongoose";
import connectToTestDB from "./src/server/testDatabase";
// File for creating, starting, and connecting to mock mongo server 

beforeAll(async() => {
  console.log('Waiting to connect to Test DB...')
  await connectToTestDB();
  console.log('Connected to Test DB from jest.setup.js!')
});

afterAll(async() => {
  await mongoose.disconnect();
});