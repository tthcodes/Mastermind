import { validationResult } from "express-validator";

const validationHandler = (req, res, next) => {
      // Check for validation result of { body } validator before continuing
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        next()
      } 
      else {
        return res.status(400).json({ errors: errors.array() });
      }
};

export default validationHandler;