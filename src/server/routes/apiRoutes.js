// Router hub for calls to api
import express from 'express';
import { query } from 'express-validator' // new, prevents SQL injections and sanitizes

const apiRouter = express.Router();

// Data-specific routes
apiRouter.get(
  '/generate-answer/',
  query('length').isInt({ min: 2, max: 10}),
  dataController.generateAnswer
);

// User-specific routes

// Authentication routes