var Letter = require("./letter.js");

// The Word constructor is responsible for creating an array of Letter objects and determining if the user guessed every Letter correctly

// word.split - splits word into array of letters
//     .map - instantiate a new `Letter` for each character and return an array
//            referred to with the instance variable, `letters`

function Word(word) {
    this.letters = word.split("").map(function(char) {
        return new Letter(char);
    });
}
Word.prototype.getWord = function() {
    return this.letters.map(function(letter) {
        return letter.getSolution();
    }).join('');
}

Word.prototype.toString = function() {
    return this.letters.join(' ');
};

Word.prototype.guessLetter = function(char) {
    var guessedLetter = false;
    this.letters.forEach(function(letter) {
        if (letter.guess(char)) {
            guessedLetter = true;
        }
    });
    return guessedLetter;
};

Word.prototype.guessedWord = function() {
    return this.letters.every(function(letter) {
        return letter.visible;
    })
}

module.exports = Word;