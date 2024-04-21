// File to export mongoServer setup and teardown functionality.
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer = null;

export const startMongoServer = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    console.log('MONGO SERVER CREATED FROM mongoServer.js')


  }
  return mongoServer;
};

export const stopMongoServer = async () => {
  if (mongoServer) {
    await mongoServer.stop();
    console.log('MONGO SERVER STOPPED FROM mongoServer.js')
    mongoServer = null;
  }
};
