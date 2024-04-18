// Router hub for calls to api
import express from 'express';
import dataController from '../controllers/dataController.js';
import { query } from 'express-validator' // new, prevents SQL injections and sanitizes
//eventually import validationErrorHandler for considerations

const apiRouter = express.Router();

// Data-specific routes
apiRouter.get(
  '/generate-answer/',
  query('length').isInt({ min: 2, max: 10}),
  query('min').isInt({ min: 0, max: 9}),
  query('max').isInt({ min: 1, max: 9}),
  dataController.generateAnswer
);

// User-specific routes

// Authentication routes

export default apiRouter;