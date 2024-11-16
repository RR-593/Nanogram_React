import React, { createContext, useState, useContext, useEffect } from 'react';
import generateNonogram from '../components/generateNonogram';
import { compareNanograms, create2DArray } from '../components/Array_functions/arrayFunctions'

// Create context for game state
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
	const [gameVersion, setGameVersion] = useState("V2.0.0"); // this is used to reset people data so nothing breaks, increment number for fresh reset
  const [gameState, setGameState] = useState('paused'); // 'paused', 'playing', 'won', 'blank'
	const [score, setScore] = useState(0);

	const [globalSettings, setGlobalSettings] = useState({
		default_board_size: 4,
		max_board_size: 25
	});
  

  // Local storage keys
  const LOCAL_STORAGE_KEYS = {
    gameVersion: 'gameVersion',
    boardsCompleted: 'boardsCompleted',
    fastestTime: 'fastestTime',
    rating: 'rating',
		stageUnlocked: 'stageUnlocked',
		difficulty: "difficulty",
		currentBoard: "currentBoard"
  };

  // Get stats from localStorage or initialize them if not found
  const getStoredStats = () => {
		const gameVersion = localStorage.getItem(LOCAL_STORAGE_KEYS.gameVersion) || "error";
    const boardsCompleted = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.boardsCompleted)) || {};
    const fastestTime = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.fastestTime)) || {};
    const rating = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.rating), 10) || 0;
		const stageUnlocked = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.stageUnlocked), 10) || 0;
		const difficulty = localStorage.getItem(LOCAL_STORAGE_KEYS.difficulty) || "normal";
		const currentBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.currentBoard)) || create2DArray(globalSettings.default_board_size,0);
    return {gameVersion, boardsCompleted, fastestTime, rating, stageUnlocked, difficulty, currentBoard};
  };

	
  const [boardsCompleted, setBoardsCompleted] = useState(getStoredStats().boardsCompleted);
  const [fastestTime, setFastestTime] = useState(getStoredStats().fastestTime);
  const [rating, setRating] = useState(getStoredStats().rating);
	const [stageUnlocked, setStageUnlocked] = useState(getStoredStats().stageUnlocked);
	const [difficulty, setDifficulty] = useState(getStoredStats().difficulty);
	const [currentBoard, setCurrentBoard] = useState(getStoredStats().currentBoard);


	const [nonogram, setNonogram] = useState(generateNonogram(globalSettings.default_board_size,difficulty));


  // Update stats in localStorage
  const updateStatsInLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.gameVersion, gameVersion);
    localStorage.setItem(LOCAL_STORAGE_KEYS.boardsCompleted, boardsCompleted);
    localStorage.setItem(LOCAL_STORAGE_KEYS.fastestTime, fastestTime);
    localStorage.setItem(LOCAL_STORAGE_KEYS.rating, rating);
    localStorage.setItem(LOCAL_STORAGE_KEYS.stageUnlocked, stageUnlocked);
    localStorage.setItem(LOCAL_STORAGE_KEYS.difficulty, difficulty);
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentBoard, currentBoard);
  };

  // Clear players board
  const clearBoard = () => {
    setCurrentBoard(create2DArray(nonogram.size,0))
  }

  // Start a new game
  const startNewGame = (size) => {
    setGameState('playing');
    setScore(0);
    setNonogram(generateNonogram(size,difficulty)); // New nonogram
    clearBoard() // Clear the board
  };

  // Clear game board
  const clearGame = () => {
    setGameState('blank'); 
    clearBoard() // Clear the board
  };

  // Check if all cells are correctly filled
  const checkWin = () => {
    return compareNanograms(currentBoard,nonogram);
  };

  // Handle the game won state
  const handleGameWon = () => {
    const currentTime = 1000; // You should implement the actual timer logic here
    const currentScore = score;

    // Increment the number of completed boards
    const newBoardsCompleted = boardsCompleted + 1;
    setBoardsCompleted(newBoardsCompleted);

    // Update fastest time if applicable
    if (!fastestTime || currentTime < fastestTime) {
      setFastestTime(currentTime);
    }

    // // Update high score if applicable
    // if (currentScore > highScore) {
    //   setHighScore(currentScore);
    // }

    // Update stats in localStorage
    updateStatsInLocalStorage();
  };

  useEffect(() => {
    // Initialize stats from localStorage when the app starts
    const stats = getStoredStats();
    if(gameVersion !== stats.gameVersion){}// clear data

    setCurrentBoard(stats.currentBoard);
    setBoardsCompleted(stats.boardsCompleted);
    setFastestTime(stats.fastestTime);
    setRating(stats.rating);
    setStageUnlocked(stats.stageUnlocked);
    setDifficulty(stats.difficulty);
  }, []);

  return (
    <GameContext.Provider value={{
      gameState,
      setGameState,
      score,
      setScore,
      globalSettings,
      nonogram,
      currentBoard,
      setCurrentBoard,
      startNewGame,
      clearGame,
      clearBoard
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use game context
const useGameContext = () => useContext(GameContext);

export default useGameContext;