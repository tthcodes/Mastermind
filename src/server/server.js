import dotenv from 'dotenv';
dotenv.config() // Load environment variables

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import connectToDB from './database.js';


// Environment variable validation
if (!process.env.MONGODB_URI) {
  console.error('ERR: Missing MONGODB_URI in environment');
  process.exit(1);
};

const PORT = process.env.PORT || 3000;

// Allows for use of filename and dirname such as in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectToDB();

app.use(express.json()); // parses incoming JSON data into Javascript code

app.use(express.static(path.resolve(__dirname, '../static'))); //


// Fallback route handler for home page
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../static/index.html'));
});

app.use((req, res) => res.sendStatus(404)); 

//Error handling middleware, ensure all errors call next(err) to trigger
app.use(
  (err, req, res, _next) => {
    const defaultErr = {
      log: 'Error caught in global handler',
      status: 500,
      message: { err: 'An error occurred' }
    };

    const errorObj = Object.assign({}, defaultErr, {
      message: { err: err.message || 'An error has occurred' }
    });

    console.log(errorObj.log);
    console.log(err);

    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});