document.addEventListener("DOMContentLoaded", function (event) {

    //--Global variables
    //===========================================================

    var TRIES = 10;
    var WINS = 0;
    var DICTIONARY = ["javascript", "makes", "me", "mad"];
    var WORD = DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];//WORD that needs to be guessed
    var utilityArray = [];                              //side array to track users guessed letters
    var enteredKeys = "";                              //variable that registers enetered keys
    var HitSound = new Audio(src = "assets/sound/hit.mp3");
    var MissSound = new Audio(src = "assets/sound/miss.mp3");
    var WonSound = new Audio(src = "assets/sound/surpraise.mp3");

    //--Functions
    //=============================================================
    //--Fills up utility array with underscores

    function Replace(string_a) {
        for (var index = 0; index < string_a.length; index++) {
            utilityArray[index] = "_";
        }
    }

    //--Outputs array on page

    function Output(string_one) {
        document.getElementById("output").textContent = "";
        string_one.forEach(function (element) {
            document.getElementById("output").textContent += element.toUpperCase() + " ";
        })
    }

    //--Check if input doesn't contain already entered leters, special symbols, capital letters and other

    function CheckInput(key) {
        if ((enteredKeys.indexOf(key) == -1) && (/^[a-z]+$/.test(key))) {
            return true;
        } else {
            return false;
        }
    }

    //--checks if the letter exsists in the WORD

    function InWord(string_a, char, string_b) {
        var guessed = 0;
        for (index = 0; index < string_a.length; index++) {
            if (char == string_a[index]) {
                string_b[index] = string_a[index];
                guessed++;
            }
        }
        if (guessed != 0) { //checking if we guessed any letters at all, to know if we need to 
            return true;    //to manipulate TRIES counter
        } else {
            return false;
        }
    }

    //--function that checks win condition

    function IsWon(string_a) {
        var number = 0;
        string_a.forEach(function (element) {
            if (element != "_") {
                number++;
            }
        })

        if (number == string_a.length) {
            return true;
        } else {
            return false;
        }
    }

    //reset word
    function Reset() {
        WORD = DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
        console.log(WORD);
        utilityArray = [];
        enteredKeys = "";
        document.getElementById("inputKeys").textContent = "";
        document.getElementById("tries").textContent = TRIES;
        document.getElementById("wins").textContent = WINS;
        Replace(WORD);
        Output(utilityArray);
    }


    //--main()
    // ===================================================================
    Reset();
    document.onkeyup = function (event) {

        var letter = event.key;

        if (CheckInput(letter)) {
            enteredKeys += letter;
            if (!InWord(WORD, letter, utilityArray)) {
                TRIES--;
                document.getElementById("inputKeys").textContent += letter + " ";
                document.getElementById("tries").textContent = TRIES;
                MissSound.play();
            } else {
                HitSound.play();
                Output(utilityArray);
            }

            //--Checking win/loose conditions
            if (IsWon(utilityArray)) {
                WINS++;
                WonSound.play();
                Reset();
            } else {

                if (TRIES <= 0) {
                    if (confirm("You lost! Press OK to play again!")) {
                        WINS = 0;
                        TRIES = 10;
                        Reset();
                    }
                }
            }
        }
    }
})
