// Middleware for fetching randomly generated answer for Mastermind
import axios from 'axios';

const dataController = {
  // Generate answer combination
  generateAnswer: async(req, res, next) => {
    try {
      // Specify user request settings 
      const length = String(req.query.length)
      const min = String(req.query.min)
      const max = String(req.query.max)

      // Retrieve response body from random API
      const response = await axios.get(
        `https://www.random.org/integers/?num=${length}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
      )
      
      // Convert plain text string of numbers into an array of integers
      const answerArray = response.data.split('\t').map((char) => parseInt(char));

      return res.status(200).json(answerArray);
    }
    catch (error) {
      console.error(`Error in dataController.generateAnswer: ${error}`)
      return next(error)
    }
  },
};

export default dataController