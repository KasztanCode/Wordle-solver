## Project Name: Wordle Solver

### Description

The "Wordle Solver" is a Node.js application designed to help you solve Wordle puzzles. Wordle is a word-guessing game where players attempt to guess a five-letter word within six attempts. This application uses a simple algorithm to make educated guesses and improve your chances of winning.

### Features

- **Word Filtering**: Filters out only the five-letter words from a list.
- **Letter Odds Calculation**: Calculates the odds of each letter appearing in the filtered words.
- **Word Ranking**: Ranks the filtered words based on calculated letter odds.
- **User Interaction**: Provides an interactive interface for you to input clues and receive suggestions.
- **Custom Criteria**: You can lock or prevent specific letters from appearing in certain positions.
- **Letter Filtering**: You can specify letters to filter out from suggestions.

### Usage

1. **Installation**:

   To use this project, you'll need Node.js installed on your system. If you don't have it, you can download it from [https://nodejs.org/](https://nodejs.org/).

2. **Clone the Repository**:

   Clone the Wordle Solver repository from GitHub:

   ```bash
   git clone https://github.com/KasztanCode/Wordle-solver.git
   cd Wordle-Solver
   ```


### Custom Clues

You can input clues to help the solver make better guesses:

- Lock a letter to a specific position: `letter@position` (e.g., `a@1`)
- Prevent a letter from appearing at a specific position: `letter#position` (e.g., `b#3`)
- Remove a letter entirely: `Rletter`

### Output

The Wordle Solver will provide word suggestions based on your input clues and the ranking algorithm. You can continue to input clues and receive updated suggestions until you solve the puzzle.

### Credits
 
- **Wordle dictionary** by https://github.com/wooferzfg
- **All words dictionary** by https://github.com/dwyl
- **This Readme** by ChatGPT