import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Function to connect to Database
const connectToTestDB = async() => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.MONGODB_URI = uri; // Change env variable for testing

  try {
    // console.log('Connecting to Test DB...');
    await mongoose.connect(uri, { dbName: 'TestUserDB' });
    // console.log ('Connected to Test DB!');
  } catch (error) {
    console.error(`Failed to connect to Test DB: ${error}`);
    process.exit(1);
  }
  // Properly close server after tests
  return mongoServer; 
};

export default connectToTestDB;