// The Game constructor is responsible for keeping score and controlling the flow of the overall game
var Word = require("./Word");
var words = require("./words");
var inquirer = require("inquirer");
var chalk = require("chalk");


function Game() {
    // Save a reference for `this` in `self` as `this` will change inside of inquirer
    var self = this;
    // Sets the guesses to 10 and gets the next word
    this.play = function() {
        this.guessesLeft = 10;
        this.newWord();
    };
    // Creates a new Word object using a random word from the array, asks the user for their guess
    this.newWord = function() {
        var randWord = words[Math.floor(Math.random() * words.length)];
        this.currentWord = new Word(randWord);
        this.newGuess();
    };

    this.askForLetter = function() {
        return inquirer.prompt([{
            type: "input",
            name: "choice",
            message: "Guess a Letter!",
            validate: function(val) {
                return /[a-z1-9]/.test(val);
            }
        }]).then(function(val) {
            var guessedRight = self.currentWord.guessLetter(val.choice);
            if (guessedRight) {
                console.log(chalk.green("CORRECT!"));
            } else {
                self.guessesLeft--;
                console.log(chalk.red("WRONG! Remaining Guesses: " + self.guessesLeft));
            }
        })
    }

    // Uses inquirer to prompt the user for their guess
    this.newGuess = function() {
        this.askForLetter().then(function() {
                if (self.guessesLeft < 1) {
                    console.log("You lose! The word was:\"" + self.currentWord.revealWord() + "\"\n");
                    self.playAgain();
                } else if (self.currentWord.guessedWord()) {
                    console.log("You Win! Play Again?");
                    self.guessesLeft = 10;
                    self.newWord();
                } else {
                    self.newGuess();
                }
            })
            // Asks the user if they want to play again after running out of guessesLeft
        this.playAgain = function() {
                inquirer.prompt([{
                    type: "confirm",
                    name: "choice",
                    message: "Play Again?"
                }]).then(function(val) {
                    if (val.choice) {
                        self.play();
                    } else {
                        self.quit();
                    }
                })
            }
            // If the user says yes to another game, play again, otherwise quit the game


        // Prompts the user for a letter
        // The users guess must be a number or letter

        // If the user's guess is in the current word, log that they chose correctly


        // Otherwise decrement `guessesLeft`, and let the user know how many guesses they have left

        // Logs goodbye and exits the node app
        this.quit = function() {
            console.log("Goodbye!")
            process.exit(0);
        };
    }
};

module.exports = Game;