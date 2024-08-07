/*
* SPOILER ALERT!
* WORDS FOR THE GAME ARE IN THIS FILE ;)
* ©2014 Nate Wiley -- MIT License
* Sounds from http://soundfxnow.com, and http://www.soundjay.com
* Fonts from Google Fonts
*/
(function($, window, undefined){

  var Hangman = {
    init: function(words){
      this.words = words;
      this.hm = $(".hangman");
      this.msg = $(".message");
      this.msgTitle = $(".title");
      this.msgText = $(".text");
      this.restart = $(".restart");
      this.wrd = this.randomWord();
      this.correct = 0;
      this.guess = $(".guess");
      this.wrong = $(".wrong");
      this.wrongGuesses = [];
      this.rightGuesses = [];
      this.guessForm = $(".guessForm");
      this.guessLetterInput = $(".guessLetter");
      this.goodSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3");
      this.badSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3");
      this.winSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3");
      this.loseSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3");
      this.setup();
    },

    setup: function(){
      this.binding();
      this.sounds();
      this.showGuess();
      this.showWrong();
    },

    sounds: function(){
      this.badSound.volume = 0.4;
      this.goodSound.volume = 0.4;
      this.winSound.volume = 0.8;
      this.loseSound.volume = 0.4;
    },

    binding: function(){
      this.guessForm.on("submit", this.theGuess.bind(this));
      this.restart.on("click", this.theRestart.bind(this));
    },

    theRestart: function(e){
      e.preventDefault();
      this.reset();
    },

    theGuess: function(e){
      e.preventDefault();
      var guess = this.guessLetterInput.val().toUpperCase();
      if(guess.match(/[A-Z]/) && guess.length === 1){
        if(this.wrongGuesses.includes(guess) || this.rightGuesses.includes(guess)){
          this.guessLetterInput.val("").focus();
        } else if(guess) {
          var foundLetters = this.checkGuess(guess);
          if(foundLetters.length > 0){
            this.setLetters(foundLetters);
          } else {
            this.wrongGuesses.push(guess);
            if(this.wrongGuesses.length === 10){
              this.lose();
            } else {
              this.showWrong(this.wrongGuesses);
            }
          }
          this.guessLetterInput.val("").focus();
        }
      } else {
        this.guessLetterInput.val("").focus();
      }
    },

    randomWord: function(){
      var randomIndex = Math.floor(Math.random() * this.words.length);
      return this._wordData(this.words[randomIndex]);
    },

    showGuess: function(){
      var frag = "<ul class='word'>";
      this.wrd.letters.forEach(function(val){
        frag += "<li data-pos='" + val.pos + "' class='letter'>*</li>";
      });
      frag += "</ul>";
      this.guess.html(frag);
    },

    showWrong: function(wrongGuesses){
      var frag = "<ul class='wrongLetters'><p>Wrong Letters: </p>";
      if(wrongGuesses){
        wrongGuesses.forEach(function(val){
          frag += "<li>" + val + "</li>";
        });
      }
      frag += "</ul>";
      this.wrong.html(frag);
    },

    checkGuess: function(guessedLetter){
      var found = [];
      this.wrd.letters.forEach(function(val){
        if(guessedLetter === val.letter){
          found.push(val);
          this.rightGuesses.push(val.letter);
        }
      }, this);
      return found;
    },

    setLetters: function(letters){
      this.correct += letters.length;
      letters.forEach(function(val){
        var letter = $("li[data-pos=" + val.pos + "]");
        letter.html(val.letter);
        letter.addClass("correct");
      }, this);
      if(this.correct === this.wrd.letters.length){
        this.win();
      }
    },

    _wordData: function(word){
      return {
        letters: this._letters(word),
        word: word.toUpperCase(),
        totalLetters: word.length
      };
    },

    hideMsg: function(){
      this.msg.hide();
      this.msgTitle.hide();
      this.restart.hide();
      this.msgText.hide();
    },

    showMsg: function(){
      var _ = this;
      _.msg.show("blind", function(){
        _.msgTitle.show("bounce", "slow", function(){
          _.msgText.show("slide", function(){
            _.restart.show("fade");
          });
        });
      });
    },

    reset: function(){
      this.hideMsg();
      this.init(this.words);
      this.hm.find(".guessLetter").focus();
    },

    _letters: function(word){
      var letters = [];
      for(var i = 0; i < word.length; i++){
        letters.push({
          letter: word[i],
          pos: i
        });
      }
      return letters;
    },

    rating: function(){
      var right = this.rightGuesses.length;
      var wrong = this.wrongGuesses.length || 0;
      return {
        rating: Math.floor((right / (wrong + right)) * 100),
        guesses: (right + wrong)
      };
    },

    win: function(){
      this.msgTitle.html("Awesome! You cracked the question.");
      this.msgText.html("Now you are super dooper!");
      this.showMsg();
    },

    lose: function(){
      this.msgText.html("Don't worry, TRY AGAIN by reloading the page.");
      this.showMsg();
    }
  };

  var wordList = ["U"];

  Hangman.init(wordList);

})(jQuery, window);
