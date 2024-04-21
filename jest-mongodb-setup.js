import mongoose from "mongoose";
import { startMongoServer } from "./mongoServer.js";

// File for creating, starting, and connecting to mock mongo server 

export default async () => {
  const mongoServer = await startMongoServer();
  const mongoURI = mongoServer.getUri();

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};