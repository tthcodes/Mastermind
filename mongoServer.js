// File to export MONGODB IN-MEMORY DATABASE, setup and teardown functionality.
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer = null;

export const startMongoServer = async () => {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  return mongoServer;
};

export const stopMongoServer = async () => {
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
};
