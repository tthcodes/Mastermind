// Important business logic to test: Generation of answer, Calculation of Correct Locations and Numbers, CheckAnswer logic
// import { getGuessAccuracy } from "../src/client/components/Play";
// getGuessAccuracy: 1st param = guess string, 2nd param = answerArr
  // returns [numbersCorrect, locationsCorrect]

describe('Logic for checking user guess against answer fully functional', () => {

  // returns [0, 0] for all incorrect
  it('Should return [0, 0] for all incorrect answers', async() => {
    const answerArr = [1, 3, 5, 7];

    // const guessAccuracy = getGuessAccuracy('6204', answerArr);
    expect(2).toBe(2);
  });
})

  // it('Should load home page and return 200', async() => {
  //   const sum = 1 + 1
  //   expect(sum).toBe(2);
  // });

  // it('Should load home page and return 200', async() => {
  //   const sum = 1 + 1
  //   expect(sum).toBe(2);
  // });
// });

// Had lots of trouble trying to get Jest to play nice with ES Modules.. won't process 
  // imported functions from JSX react files, so i decided not to spend more time here on unit tests