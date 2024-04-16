import mongoose from 'mongoose';

// Call MongoDB database from .env 
console.log('before declaring URI:', process.env.MONGODB_URI)
const URI = process.env.MONGODB_URI;

// Function to connect to Database
const connectToDB = async() => {
  try {
    console.log('Connecting to DB...');
    console.log('URI before connect:', URI);
    await mongoose.connect(URI, {
      dbName: 'UserDB'
    });
    console.log ('Connected to DB!');
  } catch (error) {
    console.error(`Failed to connect to DB: ${error}`);
    process.exit(1);
  }
};

export default connectToDB;