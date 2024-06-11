# Welcome to my Mastermind game! 🎮
This is my iteration of the Mastermind game - a code-breaking game that challenges players to guess the correct number sequence!

## How To Play 🤖

The rules are as follows:
- You will guess a 4-digit number sequence once the game starts. (Numbers can range from 0  ➡️  7)
- The computer has already generated a random, correct number sequence. It is unknown to you. (THERE CAN BE DUPLICATES!)
- You have a limited number of guesses, and the amount of guesses remaining should be shown to you.
- After each guess, you will get feedback clueing you in on how close you were to the correct answer sequence.
- The feedback contains 2 relevant numbers: one representing how many digits of your guess were correct numbers, and the other representing how many digits in your guess were in the correct location.

You can configure game settings as well! This means you can increase/decrease the number of available guesses, how many digits are in the correct sequence, etc.

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

Once Node & NPM are installed, you can confirm proper installation through your terminal with the following commands:

This command should show your current version of Node
```bash
  $ node -v
```
This command should show your current version of NPM
```bash
  $ npm -v
```

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
  ❗️**NOTE**: Be sure to add your '.env' file to your .gitignore file if you plan on committing your code to public repositories❗️

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

**Main Menu and Instructions Page** 💻

<img width="400" alt="Screenshot 2024-04-22 at 2 08 13 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/ad8a6011-b2e8-4b9a-b431-331a61edacdb">
<img width="391" alt="Screenshot 2024-04-22 at 5 18 46 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/b9e371e3-8672-4821-8301-94afc461c108">

**Sign Up, Login, and Profile Pages** 🔐

<img width="355" alt="Screenshot 2024-04-22 at 2 09 25 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/dd45e186-5613-4a96-888c-f6f06473a03a">
<img width="352" alt="Screenshot 2024-04-22 at 2 09 10 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/b911db0a-251a-4191-bff9-ee6e887b2bf3">
<img width="355" alt="Screenshot 2024-04-22 at 5 22 10 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/5172f06e-ea0f-4953-b98f-53ed629256e9">

**Game Play Demo**: Gameplay showing basic mechanics of the game 🎲

![gameplay](https://github.com/tthcodes/Mastermind/assets/115741651/5166e784-b0c7-4fae-9277-a312c89ca798)

**Game Over Demo**: Game over screen dynamically changes depending on win condition.

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

## API Architecture 🏠

![Screenshot 2024-04-23 at 2 47 22 AM](https://github.com/tthcodes/Mastermind/assets/115741651/15ca88f7-1a06-4ded-aae3-957f0d78b905)

## Game Features (MVP and Stretch Features) 🏁

### MVP 🚨
- [x] Generation of random sequence to use as the answer from random API.
- [x] Ability for the player to submit guesses.
- [x] Proper comparison between player guess and generated answer.
- [x] Logic to end game based on player guess count or if the guess is correct.
- [x] Display feedback to player to provide clues as to how close their guess was.
- [x] Provide a history log of previous guesses for the current game.
- [x] Database connection and request logic for account creation, login, updating, and deletion.

## Stretch Features 🏇
- [x] Changing the displayed 'game-over' page depending on win or loss.
- [x] Requiring age verification before sign-up (to reduce risk management in data collection).
- [x] Keeping record and updating of user score for players that are logged in.
- [x] Password hashing on account creation or changes to account password for increased data security.
- [x] Authentication of player HTTP requests that manipulate sensitive player-related data by protecting routes.
- [x] Settings page to change game parameters.
- [x] Session creation to persist player data and logged-in status - even on page reload, page close, or server restarts.
- [x] Production mode (build, start) vs. Development mode (dev).
- [x] API traffic control (via Rate Limiter).
- [x] Testing using Jest to increase codebase reliability.
- [x] CORS configuration for increased security.
- [x] Sanitation of player data inputs on the backend to protect against malicious client-side data injection.
- [ ] Leaderboard
- [ ] Have player settings saved to session data or database if logged in. (Not just game state)
- [ ] Deployment to global site.
- [ ] Load balancing.
- [ ] File-based logging.

## Lessons Learned 📆 

### Building Journey 🛠

* Day 1 - 3 (Design, Setup, Basic Game Logic, Settings)
  > The first day was spent designing my API architecture and UI. I had considered building this project in Python since it has become my preferred language for algorithms, but I was a stranger to Django and Flask. I decided due to time constraints that finding my way around a new framework would not be wise. I settled on my familiarity when it came to building a project and this was in JavaScript/React and Node/Express. Much of this first phase was spent setting up and implementing basic game logic. Before moving onto account setup implementation, I also wanted to allow users to change the parameters of the game rules - which led to the settings page you see today!
  
* Day 4 - 5 (Account creation, User Data Manipulation, Authentication, Data Persistence)
  > After I had basic game mechanisms implemented, I wanted to fully leverage the backend to manipulate and transfer data. I wondered how I could add features that would make use of my remote MongoDB database to increase user experience. This led me to implement a feature to create an account and log in. This would allow returning players to keep track of their wins as well. Once users were able to log in, I had to start thinking about how to authenticate players before allowing them access to their previous data, as well as how I could protect player's data. This led me to leverage bcrypt to hash user passwords and create sessions with MongoStore. Now users were able to remain logged in even after reloads or server restarts (as long as their cookie was valid).
  
* Day 6-7 (Testing, CORS, API Throttling, Data Sanitation, ReadME)
  > I knew that if time permitted, I wanted to get to creating tests with Jest. My main concern for the game was making sure my HTTP requests were hitting all of my routers and middleware as expected. I leveraged Jest, in combination with MongoDB's ability to create an in-memory database instance, to test all of my end-to-end logic. Once I was satisfied with my test coverage, I went on to researching other ways I could increase my application's security. I added CORS configuration, rate limiting, and data sanitation using tools provided by Express. Finally, I wanted to shift my attention to this README that you're reading currently! If given more time, there were a handful of things I would've liked to add, and you can see these in my stretch features column.

### Roadblocks 😓

This game implementation did not come without its challenges! 

- Firstly, setting up Webpack, and overall making sure that my front-end logic was being configured to proxy my API was a headache. It took hours to find where I was going wrong in my webpack.config.js file.
  
- Being able to serve up the application in production mode, after building, proved difficult as well. Most of the time I had spent in development mode. It wasn't until I thought about the prospect of deploying later on down the road that I wanted my server to be able to differentiate between production and development. Once again, I found myself spending hours between my set-up files, .env file, package.json files, and server files - and was finally able to build and serve the application without Webpack!
  
- Testing itself took me almost a whole day. Mostly because I had done research and found that it was best practice to test your application, without actually interacting with your persisting database. Figuring out how to set up Jest files to play nice with ES Module syntax, as well as setting up an in-memory Mongo database instance was super frustrating. Eventually, I was able to configure Jest config files to connect to a database instance by creating a separate testDatabase.js - which is used to start and stop the database instance. This way, my tests weren't interacting with my actual database which was expected to be used by real users!
  
- Speaking of deploying, I regretfully spent almost a whole day trying to do this as well. Setting up a CI/CD pipeline seemed simple enough with the prospect of using GitHub actions. However, for some reason, every bundle would either fail to build or my tests would fail. I even went on to try to deploy my game onto Heroku manually, without a pipeline, yet to no avail. I decided to take my losses on this one and accepted that with the time constraint, it wasn't worth spending more time than I already had on trying to deploy.

### Final Thoughts 🍻

Overall, this experience was an incredible opportunity to tackle something challenging and expand my understanding of backend considerations. I've always appreciated the logic that operates behind the scenes, but deepening my knowledge about protecting users, safeguarding their data, and building a robust application has grown my passion for backend engineering philosophy even more. 
