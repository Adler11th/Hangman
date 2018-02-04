document.addEventListener("DOMContentLoaded", function (event) {
    
    //--Global variables
    //===========================================================
    var TRIES = 10;
    var DICTIONARY = ["hello", "messy", "pygama", "frenzy"];
    var WORD = DICTIONARY[Math.floor(Math.random() * 4)];//WORD that needs to be guessed
    var utilityArray = [];                              //side array to track users guessed letters
    var enteredKeys = "";                              //variable that registers enetered keys
    

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
            document.getElementById("output").textContent += element + " ";
        })
    }

    //--Check if input doesn't contain already entered leters, special symbols, capital letters and other

    function CheckInput(key){
        if((enteredKeys.indexOf(key) == -1)&&(/^[a-z]+$/.test(key))){
            return true;
        }else{
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

    function CheckWin(string_a) {
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


    //--main()
    // ===================================================================
    Replace(WORD);

    Output(utilityArray);

    document.getElementById("tries").textContent = TRIES;

    document.onkeyup = function (event) {

        var letter = event.key;

        if (CheckInput(letter)) {
            enteredKeys += letter;
            if (!InWord(WORD, letter, utilityArray)) {
                TRIES--;
            }
            Output(utilityArray);
            document.getElementById("tries").textContent = TRIES;
            document.getElementById("guessed").textContent += letter + " ";
            //--Checking win/loose conditions
            if (CheckWin(utilityArray)) {

                alert("You won!");

            } else {

                if (TRIES <= 0) {
                    alert("You lost!");
                }
            }
        }
    }
})