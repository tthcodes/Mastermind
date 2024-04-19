// Middleware for dealing with user business logic
import userModel from "../models/userModel.js";

const userController = {
  // Generate answer combination
  signUp: async(req, res, next) => {
    try {
      
    }
    catch (err) {
      console.error(`Error in userController.signUp: ${err}`)
      return next(err)
    }
  },
};

export default userController;