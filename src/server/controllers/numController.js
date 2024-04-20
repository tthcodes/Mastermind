// Middleware for fetching randomly generated answer for Mastermind
import axios from 'axios';

const numController = {
  // Generate answer combination
  generateAnswer: async(req, res, next) => {
    try {
      // Specify user request settings, user request fields sent as URL query fields
      const max = String(req.query.max)
      const min = String(req.query.min)
      const length = String(req.query.length)

      // Retrieve response body from random API
      const response = await axios.get(
        `https://www.random.org/integers/?num=${length}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
      )
      
      // Convert plain text string of numbers into an array of integers
      const answerArray = response.data.trim().split('\n').map((char) => parseInt(char));
      console.log(`Correct answer should be ${answerArray}`) // Keep for demo purposes
      return res.status(200).json(answerArray);
    }
    catch (err) {
      console.error(`Error in dataController.generateAnswer: ${err}`)
      return next(err)
    }
  },
};

export default numController;