// Router for requests related to the user
import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';
import { body } from 'express-validator' // prevents injections and sanitizes incoming req.body data
import validationHandler from '../controllers/sanitizeController.js';

const userRouter = express.Router();

// Validate and sanitize any requests that contain client-input data in req.body

// User get request, called on page load to verify user account info and personalize UI, protect
userRouter.get('/get-user-data', 
  authController.authenticateUser, 
  userController.getUser, 
  (req, res) => {
  res.status(200).json(req.user);
});

// User post requests (Sign up, Log in, Logout)
userRouter.post('/sign-up', [
    body('username')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),

    body('password')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),
  ], 
  validationHandler,
  userController.signUp
);

userRouter.post('/login', [
    body('username')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),

    body('password')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),
  ], 
  validationHandler,
  userController.signIn
);

userRouter.post('/logout', userController.logout);

// User patch requests (Change password, Update win totals), protect
userRouter.patch('/change-password', [
    body('oldPassword')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),

    body('newPassword')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),
  ],
  validationHandler,
  authController.authenticateUser, 
  userController.getUser,
  userController.changePassword
);

userRouter.patch('/update-score', 
authController.authenticateUser, 
userController.getUser,
userController.updateScore
);

// User delete requests (Delete account), protect
userRouter.delete('/delete-account', [
    body('deletePassword')
      .trim()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_]+$/),
  ],
  validationHandler,
  authController.authenticateUser,
  userController.getUser,
  userController.deleteAccount
);



export default userRouter;