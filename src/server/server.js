import dotenv from 'dotenv';
dotenv.config() // Load environment variables

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import connectToDB from './database.js';
import apiRouter from './routers/apiRouter.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Check environment mode
const MODE = process.env.NODE_ENV || 'development'

// Environment variable validation
if (!process.env.MONGODB_URI) {
  console.error('ERR: Missing MONGODB_URI in environment');
  process.exit(1);
};

// Allows for use of filename and dirname such as in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// General Middleware for all environments
app.use(express.json()); // parses incoming JSON data into Javascript code
app.use(express.urlencoded({ extended: true })); // parses incoming URL-encoded payload req's for form submission

// Session middleware setup, placement before route handling allows for session data availability
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: false, //better for login sessions + complies with permission laws
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production mode
    maxAge: 1000 * 60 * 60 * 24 // Cookie valid for 24 hours
  }
}));

// Route handling for all API requests
app.use('/api', apiRouter)

// If in production mode, handle serving static files
if (MODE === 'production'){
  connectToDB()
  app.use(express.static(path.resolve(__dirname, '../../dist'))); // serve static files
  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
  });
  console.log('MODE IS IN PRODUCTION')
  console.log(path.resolve(__dirname, '../dist'))
} else if (MODE === 'development'){
  console.log('MODE IS IN DEVELOPMENT')
  connectToDB()
}

// Error if no routing occurs
app.use((req, res) => res.sendStatus(404)); 

//Error handling middleware, ensure all errors call next(err) to trigger
  //Make sure middleware sends err object containing more info on error for debugging
app.use((err, req, res, _next) => {
    
    const defaultErr = {
      log: 'Error caught in global handler',
      status: err.status || 500,
      message: err.message || { err: 'An error occurred' }
    };
    
    console.log(err.log || 'Unspecified middleware error')
    
    return res.status(defaultErr.status).json({ message: defaultErr.message });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});