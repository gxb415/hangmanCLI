// The Letter constructor is responsible for displaying either an underscore or the underlying character for each letter in the word
function Letter(char) {
    this.visible = !/[a-z1-9]/i.test(char);

    this.char = char;
}

Letter.prototype.toString = function() {

    if (this.visible === true) {
        return this.char;
    }
    return "_";
};

Letter.prototype.guessed = function(userGuess) {
    if (userGuess.toUpperCase() === this.char.toUpperCase()) {
        this.visible = true;
        return true;
    }
    return false;
};

Letter.prototype.getWord = function() {
    return this.char;
};

module.exports = Letter;