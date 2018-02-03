document.addEventListener("DOMContentLoaded",function(event){

var dictionary=["hello", "messy","pygama","frenzy"];
// --Functions
//=============================================================

//TODO function Reset()

function Replace(string_one){
    for(index = 0; index<string_one.length;index++){
        utilityArray[index]="_";
        Output(utilityArray);
    }
}

//--Output function

function Output(string_one){
    document.getElementById("output").textContent="";
    string_one.forEach(function(element){
        document.getElementById("output").textContent+=element+" ";
    })
}

//--function that checks if the letter exsists in the word
 
function CheckLetter(string_a,char,string_b){
    for(index = 0; index < string_a.length; index++){
        if(char == string_a[index]){
            string_b[index]=string_a[index];
        }
    }
}

//--function that checks win/loose conditions

function CheckWinLoose(string_a){
    var number = 0;
    string_a.forEach(function(element){
        if(element!="_"){
            number++;
        }
    })

    if(number==string_a.length){
        return true;
    }else{
        return false;
    }
}


//--main()
//--game loop
// ===================================================================

var word = dictionary[Math.floor(Math.random()*4)];
console.log(word);

var utilityArray=[];//side array to track users guessed letters

var keys = "";//--variable that registers eneter keys
var tries = 10;

Replace(word);
document.getElementById("tries").textContent = tries;
document.onkeyup = function(event){
    var letter = event.key;
    if(keys.indexOf(letter)==-1){
    keys+=letter;
    CheckLetter(word,letter,utilityArray);
    //TODO track tries
    Output(utilityArray);
    document.getElementById("tries").textContent = tries;
    document.getElementById("guessed").textContent += letter+" ";
    if(CheckWinLoose(utilityArray)){alert("You won!");}
    }
}
})