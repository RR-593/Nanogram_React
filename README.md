<h1 align="center">
     <img src="https://github.com/RR-593/Nanogram_React/blob/main/public/favicon.ico" width="30" height="30">
    <b>Nanogram Web App</b>
    <br>
</h1>

<p align="center">
  <b>A simple and interactive Nanogram</b> <br />
  <b>Built with React • Really fun to play.</b> <br />
</p>

<h3 align="center">
 &bull;
  <a href="https://rr-593.github.io/Nanogram_React/">Play</a>  &bull;
</h3>

## Features

- Interactive grid with clickable cells to reveal or hide parts of the picture.
- User-friendly interface with row and column clues.
- Option to set the size of the board.
- Option to reset the game and start over.
<!-- - Timer to track how long it takes to solve the puzzle (optional). -->

### Features in devlopment

- Responsive design for mobile and desktop views.

## Tech Stack

- **React** – Frontend framework
- **JavaScript** – Core functionality
<!-- - **LocalStorage** – Optionally for saving progress or high scores -->
- **CSS** – For styling and layout

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/RR-593/Nanogram_React.git
    ```

2. Navigate into the project directory:

    ```bash
    cd Nanogram_React
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

### Install with docker

Requires docker to be installed (duh)

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/RR-593/Nanogram_React.git
    ```

2. Build and run docker compose file

    ```bash
    docker compose up --build -d
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the app.

## How to Play

1. The puzzle grid is represented by rows and columns of cells.
2. The numbers on the left (rows) and top (columns) indicate groups of consecutive filled cells. For example, `3 1` means there is a group of 3 filled cells, followed by a gap, and then 1 filled cell.
3. Click on a cell to fill it in, or click again to remove it.
4. Use the clues on the sides to help you solve the puzzle.
5. Complete the puzzle to reveal the hidden image.
6. Reset the game at any time using the clear button.
OR
Create a new puzzle with + button.

## Game Logic

- The grid cells are represented as a 2D array of objects, each having a state to track whether the cell is filled or empty.
- The clues are parsed and checked against the user’s inputs to validate progress.
- The game checks for a win condition once when user submits their proposed solution.
- Then if all cells are correctly filled according to the clues, the game lets out some confetti.

## Contributing

If you’d like to contribute, please fork the repository and submit a pull request with your changes. Make sure to follow the code style and add tests if necessary.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [React](https://reactjs.org/) provided the core functionality of the app.
- [FontasomeV4](https://fontawesome.com/v4/) provided the icons used in the game.
- Game mechanics are inspired by well known puzzle genre Nanograms.
