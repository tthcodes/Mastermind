import mongoose from "mongoose";
import { stopMongoServer } from "./mongoServer.js";

// File for stopping and disconnecting from mock mongo server

export default async () => {
  try {
    await mongoose.disconnect();
    console.log('Database disconnected');
    await stopMongoServer();
    console.log('Server stopped');
  } catch (error) {
    console.error('Error during teardown:', error);
  }
};