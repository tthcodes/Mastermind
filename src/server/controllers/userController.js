// Middleware for dealing with user business logic
import userModel from "../models/userModel.js";

const userController = {
  // Generate answer combination
  signUp: async(req, res, next) => {
    try {
      const { username, password } = req.body;
      const newUser = new userModel({
        username,
        password
      });
      await newUser.save();
      res.status(201).send('Account created successfully.') // 201 = indicates new resource created
    } catch (err) {
      console.error(`Error in userController.signUp: ${err}`);

      // Check for unique key error, if so, return error message to client
      if (err.code === 11000) {
        return res.status(409).json({ 
          message: 'Username already exists. Choose another one.'
        });
      }

      // Structured error object
      const errorInfo = {
        log: 'SignUp Error',
        status: 500,
        message: 'Failed to create account.',
        error: err.message
      };
      return next(errorInfo)
    };
  },

  signIn: async(req, res, next) => {
    try {
      const { username, password } = req.body;
    } catch (err) {
      console.error(`Error in userController.signIn: ${err}`);

      if (err.code === 11000) {
        return res.status(409).json({ 
          message: 'Username already exists. Choose another one.'
        });
      }

      // Structured error object
      const errorInfo = {
        log: 'Sign In Error',
        status: 500,
        message: 'Failed to create account.',
        error: err.message
      };
      return next(errorInfo)
    };
  },
};

export default userController;