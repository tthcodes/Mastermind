import dotenv from 'dotenv';
dotenv.config() // Load environment variables

import express from 'express';
import connectToDB from './database.js';
import { fileURLToPath } from 'url';
import path from 'path';
import apiRouter from './routers/apiRouter.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors'; // Should i put this in routers for more granular approach?
import rateLimit from 'express-rate-limit'

// Environment variable validation
if (!process.env.MONGODB_URI) {
  console.error('ERR: Missing MONGODB_URI in environment');
  process.exit(1);
};

// Check environment mode
const MODE = process.env.NODE_ENV || 'development'

// Allows for use of filename and dirname such as in CommonJS, adapted for ES Module Syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Define rate limiting parameters
const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // defined window for requests
  max: 30, // max num of requests from each IP per window
  message: 'Request limit reached, please try again after 2 minutes.',
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

// General Middleware for all environments
app.use(express.json()); // parses incoming JSON data into Javascript code
app.use(express.urlencoded({ extended: true })); // parses incoming URL-encoded payload req's for form submission
app.use(cors({
  origin: '*', // Configure in PRODUCTION environments. Fine for development..
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies to be sent with requests
}));

// Session middleware setup, placement before route handling allows for session data availability
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: false, //better for login sessions + complies with permission laws
  cookie: {
    // Secure cookies in production mode best practice, 
      // cookies sent over HTTPS connections only.. but gave me trouble in production mode
    // secure: process.env.NODE_ENV === 'production',
    httpOnly: true, // Protects against cross-site scripting, cookies inaccessible to JS
    maxAge: 1000 * 60 * 60 * 24 // Cookie valid for 24 hours
  }
}));

// Apply rate limiter to requests before routing to api router hub
app.use('/api', apiLimiter, apiRouter)

// Connect to database if not in testing mode
if(MODE !== 'test'){
  connectToDB();
}

// If in production mode, handle serving static files
if (MODE === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')));
} else {
  // Make root route always available if not in production mode.
  app.get('/', (req, res) => {
    res.send('Home Page');
  });
    console.log(`MODE IS CURRENTLY IN ${MODE.toUpperCase()}`);
}

// Error for no route matches
app.use((req, res) => res.sendStatus(404)); 

// Error handling middleware, ensure all errors call next(err) to trigger
// Make sure middleware sends err object containing more info on error for detailed error logging
app.use((err, req, res, _next) => {

    console.log(err.log || 'Unspecified middleware error')

    const defaultErr = {
      status: err.status || 500,
      message: err.message || { err: 'An error occurred' }
    };
    
    res.status(defaultErr.status).json({ message: defaultErr.message });
  });


if (MODE !== 'test') {
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })};

export default app;