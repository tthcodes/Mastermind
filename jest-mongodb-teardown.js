import mongoose from "mongoose";
import { stopMongoServer } from "./mongoServer.js";

// File for stopping and disconnecting from mock mongo server

export default async () => {
  await mongoose.disconnect();
  await stopMongoServer();
};