// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
  console.log(letterPoints)
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let initialPrompt = function() {
   playersWord = input.question("Let's play some scrabble! Enter a word: ");

  while(!/^[a-zA-Z]*$/g.test(playersWord)){
     playersWord = input.question("Invaild! Enter a word: ");
   }
  
};

function simpleScore(word){

  word = word.toUpperCase();
  let letterPoints = '';
  let totalPoints =0;
  totalPoints += Number(word.length);

  for (let i=0; i<word.length;i++){
    letterPoints += `Points for '${word[i]}': 1\n`;
    
  }
  console.log(letterPoints);
  console.log(totalPoints);
  return Number(letterPoints);
};

const vowelPointStructure = {
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z']
  
};

let vowelBonusScore = function(word){

  word = word.toUpperCase();
	let letterPoints = "";
  let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelPointStructure) {
 
		 if (vowelPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      totalPoints += Number(pointValue);
		 }
 
	  }
	}
  console.log(letterPoints);
  console.log(totalPoints);
	return Number(letterPoints);
}

// let scrabbleScore;

let simpleScoreObj = {
  name: 'Simple Score',
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore
};

let vowelBonusScoreObj = {
  name: 'Bonus Vowel',
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: vowelBonusScore
};

let scrabbleObj = {
  name: 'Scrabble',
  description: "The traditional scoring algorithm.",
  scoreFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScoreObj,vowelBonusScoreObj,scrabbleObj];


function scorerPrompt() {
  playersAlgoSelection = input.question(`Which scoring algorithm would you like to use?
  0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
  1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
  1 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
  Enter 0, 1, 2:`);

  while(playersAlgoSelection !== '0' && playersAlgoSelection !== '1' && playersAlgoSelection !== '2'){
    playersAlgoSelection = input.question(`Which scoring algorithm would you like to use?
  0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
  1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
  1 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
  Enter 0, 1, 2:`);
  
  }
  

  if(playersAlgoSelection == 0){
    console.log(`Score for '${playersWord}''`)
    return simpleScore(playersWord);

  } else if (playersAlgoSelection == 1){
    console.log(`Score for '${playersWord}''`)
    return vowelBonusScore(playersWord);

  } else if (playersAlgoSelection == 2){
    console.log(`Score for '${playersWord}''`)
    return scrabbleScore(playersWord);
  }
}

function transform(oldPointStructure) {

let newPointStructure = {};

  for (key in oldPointStructure){

    for (let i = 0; i<oldPointStructure[key].length;i++){

      let letters = oldPointStructure[key][i].toLowerCase();
      let keyValue = oldPointStructure[key];
      

      if(keyValue == oldPointStructure[1]){
        newPointStructure[letters] = 1; 
      } else if(keyValue == oldPointStructure[2]){
        newPointStructure[letters] = 2;
      } else if(keyValue == oldPointStructure[3]){
        newPointStructure[letters] = 3;
      } else if(keyValue == oldPointStructure[4]){
        newPointStructure[letters] = 4;
      } else if(keyValue == oldPointStructure[5]){
        newPointStructure[letters] = 5;
      } else if(keyValue == oldPointStructure[8]){
        newPointStructure[letters] = 8;
      } else if(keyValue == oldPointStructure[10]){
        newPointStructure[letters] = 10;
      }
    }
  }
return newPointStructure
}
let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;


function scrabbleScore(word) {

	word = word.toLowerCase();
	let letterPoints = "";
  let totalPoints = 0;
  

	for (let i = 0; i < word.length; i++) {

	  for (const [key, value] of Object.entries(newPointStructure)) {
    
		 if (`${key}` === (word[i])) {
			letterPoints += `Points for '${word[i]}': ${value}\n`;  
      totalPoints += Number(`${value}`)
		 }
 
	  }
	}
 
  console.log(letterPoints)
  console.log(totalPoints)
	return letterPoints;
 }

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

