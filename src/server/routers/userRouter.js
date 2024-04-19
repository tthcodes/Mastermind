// Router for requests related to the user
import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

// Check if user is logged in on home page. 
// Show user score if they are logged in (Home, Play, GameOver)
// Display user name on HomePage, and GameOver if logged in
// Calculate total earned points w/ every win that also updates user score. 

// userRouter.post('/sign-up', userController.signUp);

export default userRouter;