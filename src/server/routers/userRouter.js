// Router for requests related to the user
import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const userRouter = express.Router();


userRouter.post('/sign-up', userController.signUp);
userRouter.post('/login', userController.signIn, authController.verifySession);
userRouter.post('/logout', userController.logout);
userRouter.post('/change-password', 
authController.authenticateUser, 
userController.getUser,
userController.changePassword
);

// Route called on page load to verify user and personalize UI
userRouter.get('/get-user-data', 
  authController.authenticateUser, 
  userController.getUser, 
  (req, res) => {
  res.status(200).json(req.user);
})


export default userRouter;