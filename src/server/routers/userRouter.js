// Router for requests related to the user
import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';

const userRouter = express.Router();

// user post requests (Sign up, Log in, Logout)
userRouter.post('/sign-up', userController.signUp);
userRouter.post('/login', userController.signIn, authController.verifySession);
userRouter.post('/logout', userController.logout);

// user patch requests (Change password, Update win totals)
userRouter.patch('/change-password', 
authController.authenticateUser, 
userController.getUser,
userController.changePassword
);

userRouter.patch('/update-score', 
authController.authenticateUser, 
userController.getUser,
userController.updateScore
);

// user delete requests (Delete account)
userRouter.delete('/delete-account', 
authController.authenticateUser,
userController.getUser,
userController.deleteAccount
);

// user get request, called on page load to verify user account info and personalize UI
userRouter.get('/get-user-data', 
  authController.authenticateUser, 
  userController.getUser, 
  (req, res) => {
  res.status(200).json(req.user);
})


export default userRouter;