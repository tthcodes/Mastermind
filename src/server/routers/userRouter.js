// Router for requests related to the user
import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';
import { body } from 'express-validator' // prevents injections and sanitizes incoming req.body data
import validationHandler from '../controllers/sanitizeController.js';

const userRouter = express.Router();

// Validate and sanitize any requests that contain client-input data in req.body

// User get request, called on page load to verify user account info and personalize UI, protect route
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
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/), // Ensures input data is a-z, A-Z, 0-9, or special chars

    body('password')
      .trim()
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/),
  ], 
  validationHandler,
  userController.signUp
);

userRouter.post('/login', [
    body('username')
      .trim()
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/),

    body('password')
      .trim()
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/),
  ], 
  validationHandler,
  userController.signIn
);

userRouter.post('/logout', userController.logout);

// User patch requests (Change password, Update win totals), protect route
userRouter.patch('/change-password', [
    body('oldPassword')
      .trim()
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/),

    body('newPassword')
      .trim()
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/),
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

// User delete requests (Delete account), protect route
userRouter.delete('/delete-account', [
    body('deletePassword')
      .trim()
      .isString()
      .notEmpty()
      .matches(/^[a-zA-Z0-9_!@#$%^&*()]+$/),
  ],
  validationHandler,
  authController.authenticateUser,
  userController.getUser,
  userController.deleteAccount
);

export default userRouter;