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

### Steps for installation:
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
  - This application leverages sessions to persist user data, generate your own unique session secret and store this in your '.env' file. This keeps your session secrets and MongoDB connections more secure.
  - Add the your unique keys into your new '.env' file (replace placeholders): 
  ```plaintext
    NODE_ENV=development
    MONGODB_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
  ```
  - **NOTE**: It is important that you add your new '.env' file to your .gitignore if you're intending on committing your code to public repositories. 
4. Build and start the application:
```bash
  $ npm build
  $ npm start
```

<img width="642" alt="Screenshot 2024-04-22 at 2 08 13 PM" src="https://github.com/tthcodes/Mastermind/assets/115741651/ad8a6011-b2e8-4b9a-b431-331a61edacdb">

