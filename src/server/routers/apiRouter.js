// Router hub for all calls to api
import express from 'express';
import numController from '../controllers/numController.js';
import authController from '../controllers/authController.js';
import { query } from 'express-validator' // prevents injections and sanitizes incoming req.query data
import userRouter from './userRouter.js';
import validationHandler from '../controllers/sanitizeController.js';

const apiRouter = express.Router();

// User-specific routes, /api/user

apiRouter.use('/user', userRouter);

// Sanitize sent query data from client request when generating new answer, /api/generate-answer/
apiRouter.get(
  '/generate-answer/',
  query('length').isInt({ min: 2, max: 6}), // no setting for under 2 or over 6 nums
  query('min').isInt({ min: 0, max: 8}), // settings disallow minNums outside this range
  query('max').isInt({ min: 1, max: 9}), // settings disallow maxNums outside this range
  validationHandler,
  numController.generateAnswer
);

// Session-related routes, no sanitation needed since session data handled by server, 
  // /api/auth/verify-session
apiRouter.get('/auth/verify-session', authController.verifySession);

export default apiRouter;