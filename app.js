const fs = require('fs');
const readline = require("readline");

// Function to filter words without repeating letters
function fiveLetterWords(text) {
    const words = text.split('\n').map(word => word.replace('\r', ''));
    const fiveLetterWords = words.filter(word => word.length === 5).map(word => word.toLowerCase());

    return fiveLetterWords;
}

// Function to calculate letter odds for words with repeating letters
function calculateLetterOdds(words) {
    const letterCounts = {}; // Object to store the counts of each letter
    let totalLetters = 0;

    // Count the occurrences of each letter and the total number of letters
    for (const word of words) {
        const letterSet = new Set();
        for (const char of word) {
            if (!letterSet.has(char)) {
                letterCounts[char] = (letterCounts[char] || 0) + 1;
                totalLetters++;
                letterSet.add(char);
            }
        }
    }

    // Calculate letter odds
    const letterOdds = {};
    for (const char in letterCounts) {
        const odds = letterCounts[char] / totalLetters;
        letterOdds[char] = odds;
    }

    return letterOdds;
}

// Function to rank words based on letter odds
function rankWordsByLetterOdds(words, letterOdds) {
    return words.map(word => ({
        word,
        score: calculateWordScore(word, letterOdds),
    }));
}

// Function to calculate a word's score based on letter odds
function calculateWordScore(word, letterOdds) {
    const wordProbability = Array.from(word).reduce((probability, char) => probability * letterOdds[char], 1);
    return wordProbability.toFixed(64); // Adjust the number of decimal places as needed
}

// Function to print the highest-ranking words
function sortWords(rankedWords) {
    let sortedWords;
    return sortedWords = rankedWords.slice().sort((a, b) => b.score - a.score); // Sort by score in descending order;
}

// Function to check if a word meets the criteria
function meetsCriteria(word, criteria) {
    word = word.toLowerCase(); // Convert the word to lowercase for case-insensitive comparison

    return criteria.every(filter => {
        const { letter, position, forbiddenPosition } = filter;

        if (forbiddenPosition !== undefined) {
            return word.charAt(forbiddenPosition) !== letter.toLowerCase() && word.includes(letter.toLowerCase());
        } else {
            return word.charAt(position) === letter.toLowerCase();
        }
    });
}

// Function that filters array based on the criteria and letters to filter
function filter(words,criteria,lettersToFilter){
    const filteredArray = sortWords(rankedWords)
        .filter(item => meetsCriteria(item.word, criteria))
        .filter(item => !lettersToFilter.some(letter => item.word.includes(letter)));
    return filteredArray
}

function showPossibleWords(){
    if (filteredArray.length >= 10){
        for (let i = 0; i < 10; i++) {
            console.log(filteredArray[i].word)
        }
    }else {
        for (let i = 0; i < filteredArray.length; i++) {
            console.log(filteredArray[i].word)
        }
    }
}

function getUserInput() {
    rl.question(
        ' Type letter + @ + position to lock a letter to position or \n letter + # + position to prevent letter form being at that positon or \n R + letter to remove letter entirely ', (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
            rl.close();
        } else {
            if (userInput.length == 3 && userInput.includes('@') && userInput[2] >= 0 && userInput[2] <= 4){
                criteria.push({letter:userInput[0],position:userInput[2]});
                console.log(criteria);
                filteredArray = filter(rankedWords,criteria,lettersToFilter);
                showPossibleWords();
            }else if(userInput.length == 2 && userInput[0] == 'R'){
                lettersToFilter.push(userInput[1]);
                console.log(lettersToFilter);
                filteredArray = filter(rankedWords,criteria,lettersToFilter);
                showPossibleWords()
            }else if(userInput.length == 3 && userInput.includes('#') && userInput[2] >= 0 && userInput[2] <= 4){
                criteria.push({letter:userInput[0],forbiddenPosition:userInput[2]});
                console.log(criteria);
                filteredArray = filter(rankedWords,criteria,lettersToFilter);
                showPossibleWords();
            }else if(userInput == ''){
                filteredArray = filter(rankedWords,criteria,lettersToFilter);
                showPossibleWords()
            }else {
                console.log('invalid input');
            }
            getUserInput();
        }
    });
}
//Function that makes a json file auxiliary function (don't use on regular basis)
function makeAFile(data, path) {
    const jsonData = JSON.stringify(data, null, 2);

    try {
        // Write the JSON data to the file synchronously
        fs.writeFileSync(path, jsonData);
        console.log('Data written to JSON file synchronously.');
    } catch (err) {
        console.error('Error writing to JSON file:', err);
    }
}

// Read the text from the file
const text = fs.readFileSync('wordle_dictionary.txt', 'utf-8');

// Array of all five-letter words
const words = fiveLetterWords(text);

// Calculate letter odds for words
const letterOdds = calculateLetterOdds(words.join('\n'));

// Rank words based on letter odds
const rankedWords = rankWordsByLetterOdds(words, letterOdds);

let criteria = [];
let lettersToFilter = [];
let filteredArray = [];

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
console.log(' _    _                   _  _                      _                    \n' +
    '| |  | |                 | || |                    | |                   \n' +
    '| |  | |  ___   _ __   __| || |  ___    ___   ___  | |__   __  ___  _ __ \n' +
    '| |/\\| | / _ \\ | \'__| / _` || | / _ \\  / __| / _ \\ | |\\ \\ / / / _ \\| \'__|\n' +
    '\\  /\\  /| (_) || |   | (_| || ||  __/  \\__ \\| (_) || | \\ V / |  __/| |   \n' +
    ' \\/  \\/  \\___/ |_|    \\__,_||_| \\___|  |___/ \\___/ |_|  \\_/   \\___||_|   \n' +
    '                                                                         \n' +
    '                                                                         ')
getUserInput();
