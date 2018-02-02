//--variables

var dictionary=["hello", "messy","pygama","frenzy"];
var word = dictionary[Math.floor(Math.random()*4)];
var e_word=[];
var tries = 10;
console.log(word);

//--function that 

function Replace(string_one,string_two){
    for(index = 0; index<string_one.length;index++){
        e_word[index]="_";
    }
    console.log(e_word);
}

//--function that checks if the letter exsists in the word

function Check(string,char){
    for(index = 0; index < string.length; index++){
        if(char == string[index]){
            console.log("-success");
        }else{
            console.log("-fail")
        }
    }
}

//--event calls for functions
Replace(word,e_word);

document.onkeyup = function(event){
    var letter = event.key;
    Check(word,letter);
    document.getElementById("guessed").textContent += letter+", ";
}
