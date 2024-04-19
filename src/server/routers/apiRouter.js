// Router hub for all calls to api
import express from 'express';
import numController from '../controllers/numController.js';
import { query } from 'express-validator' // new, prevents SQL injections and sanitizes
//eventually import validationErrorHandler for considerations
import userRouter from './userRouter.js';

const apiRouter = express.Router();

// Data-specific routes
apiRouter.get(
  '/generate-answer/',
  query('length').isInt({ min: 2, max: 10}),
  query('min').isInt({ min: 0, max: 9}),
  query('max').isInt({ min: 1, max: 9}),
  numController.generateAnswer
);

// User-specific routes, /api/user
apiRouter.use('/user', userRouter);

// Session-related routes

export default apiRouter;