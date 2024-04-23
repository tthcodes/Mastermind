# Welcome to my Mastermind game! 🎮
This is my iteration of the Mastermind game - a code-breaking game that challenges players to guess the correct number sequence!

## Tech Stack 💻
**Frontend**: HTML, CSS, JavaScript/React

**Backend**: Node.js/Express.js, MongoDB, Mongoose

**Testing**: Jest

**Dev Tools**: Webpack/Babel, ESLint

**Version Control**: Git/GitHub

## Installation & Setup 🔧

Before installing, ensure you have the following prerequisites installed:
- Node.js (v18.16.9 or later)
- npm (9.5.1 or later)
- MongoDB (local or remote instance)

If you require assistance in installing system requirements, refer to these links:
- Node: [https://nodejs.org/en]
- npm: [https://docs.npmjs.com/about-npm]

### Steps for game installation:
1. Clone the repository:
```bash
  $ git clone https://github.com/tthcodes/Mastermind
  $ cd Mastermind
```
2. Install game dependencies:
```bash
  $ npm install
```
3. Set up local environment variables:
  - Create a local '.env' file in the root directory.
  - Ensure that you have created a local or remote MongoDB database and have a unique URI.
  - This application leverages sessions to persist user data, generate your own unique session secret, and store this in your '.env' file. This keeps your session secrets and MongoDB connections more secure.
  - Add the your unique keys into your new '.env' file (replace placeholders): 
  ```plaintext
    NODE_ENV=development
    MONGODB_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
  ```
  ❗️**NOTE**: It's important to add your '.env' file to your .gitignore file if you plan on committing your code to public repositories.❗️

4. Build and start the application:
```bash
  $ npm run build
  $ npm run start
```
  - Once started, navigate to [http://localhost:3000] to start playing. 
  - If production mode is giving you trouble, you also have the option to run the game in dev mode:

```bash
  $ npm run dev
```
  - This will automatically run your application using Webpack on [http://localhost:4000]. 

## Testing 🗂

You can run tests to inspect code reliability by running the following in your terminal:

```bash
  $ npm test
```

## Demo and Screenshots 📸

**Main Menu**: Home page on application load. 💻

  <img width="642" alt="Screenshot 2024-04-22 at 2 08 13 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/ad8a6011-b2e8-4b9a-b431-331a61edacdb">

**Instructions Page**: How to play page that describes gameplay mechanics and rules. 📄

<img width="621" alt="Screenshot 2024-04-22 at 5 18 46 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/b9e371e3-8672-4821-8301-94afc461c108">

**Sign Up Page**: Sign up page that allows players to register an account. 📩

<img width="649" alt="Screenshot 2024-04-22 at 2 09 25 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/dd45e186-5613-4a96-888c-f6f06473a03a">

**Login Page**: Login page allowing returning players to log in. 🔐

<img width="646" alt="Screenshot 2024-04-22 at 2 09 10 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/b911db0a-251a-4191-bff9-ee6e887b2bf3">

**Account Page**: Profile page that allows players to change password or delete account. (Once logged in) 👤

<img width="624" alt="Screenshot 2024-04-22 at 5 22 10 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/5172f06e-ea0f-4953-b98f-53ed629256e9">

**Game Play Demo**: Gameplay showing basic mechanics of the game. 🎲

![gameplay](https://github.com/tthcodes/Mastermind/assets/115741651/5166e784-b0c7-4fae-9277-a312c89ca798)

**Game Over Demo**: Game over screen dynamically changes depending on if the player wins or loses.

<table>
  <tr>
    <td><strong>Example of the player losing: ❌ </strong><br>
      <img src="https://github.com/tthcodes/Mastermind/assets/115741651/b54304b1-5cc7-4665-b57b-e38ccddc43d7" alt="Losing Screen">
    </td>
    <td><strong>Example of the player winning: ✅</strong><br>
      <img src="https://github.com/tthcodes/Mastermind/assets/115741651/878c5139-9a25-4d60-8482-a497b40cc3d2" alt="Winning Screen">
    </td>
  </tr>
</table>

**Settings Demo**: You can change the parameters of the game however you like! ⚙️

![SettingsMM](https://github.com/tthcodes/Mastermind/assets/115741651/4eded940-fd71-456a-8338-ffba3765e169)

## Game Features (MVP and Stretch Features) 🏁

### MVP
- [x] Generation of random sequence to use as the answer from random API.
- [x] Ability for the player to submit guesses.
- [x] Proper comparison between player guess and generated answer.
- [x] Database and request logic for account creation, login, updating, and deletion.
- [x] Logic to end game based on player guess count or if the guess is correct.

## Stretch Features
- [x] Settings page to change game parameters.
- [x] Authentication of requests that manipulate user data.
- [x] Changing the displayed game over the page depending on win or loss.
- [x] Production mode vs. Development mode.
- [x] Session creation to persist user data and logged-in status.
- [x] Request traffic control (API Throttling).
- [x] Integration testing for end-to-end codebase reliability.
- [x] CORS configuration.
- [ ] Leaderboard
- [ ] Have settings saved
- [ ] Deployment to global site.
- [ ] Load balancing

## Journey, Roadblocks, and Lessons Learned 📆 
