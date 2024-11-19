import React, { createContext, useState, useContext, useEffect } from 'react';
import generateNonogram from '../components/generateNonogram';
import { compareNonograms, create2DArray } from '../components/Array_functions/arrayFunctions'


// Create context for game state
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
  const [gameVersion, setGameVersion] = useState("V2.0.0"); // this is used to reset people data so nothing breaks, increment number for fresh reset
  const [score, setScore] = useState(0);

  const [globalSettings, setGlobalSettings] = useState({
    clearBoard: false,
    default_board_size: 4,
    max_board_size: 25
  });


  // Local storage keys
  const LOCAL_STORAGE_KEYS = {
    gameVersion: 'gameVersion',
    gameState: 'gameState',
    boardsCompleted: 'boardsCompleted',
    boardsUnlocked: 'boardsUnlocked',
    fastestTime: 'fastestTime',
    rating: 'rating',
    stageUnlocked: 'stageUnlocked',
    difficulty: "difficulty",
    nonogram: "nonogram",
    currentBoard: "currentBoard"
  };

  // Get stats from localStorage or initialize them if not found
  const getStoredStats = () => {
    const gameVersion = localStorage.getItem(LOCAL_STORAGE_KEYS.gameVersion) || "error";
    const gameState = localStorage.getItem(LOCAL_STORAGE_KEYS.gameState) || "paused"; // 'paused', 'playing', 'won'
    const boardsCompleted = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.boardsCompleted)) || {};
    const boardsUnlocked = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.boardsUnlocked)) || [globalSettings.default_board_size, 8];
    const fastestTime = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.fastestTime)) || {};
    const rating = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.rating), 10) || 0;
    const stageUnlocked = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.stageUnlocked), 10) || 0;
    const difficulty = localStorage.getItem(LOCAL_STORAGE_KEYS.difficulty) || "normal";
    const nonogram = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.nonogram)) || generateNonogram(globalSettings.default_board_size, difficulty);
    const currentBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.currentBoard)) || create2DArray(globalSettings.default_board_size, 0);
    return { gameVersion,gameState, boardsCompleted, fastestTime, rating, stageUnlocked, difficulty, currentBoard, boardsUnlocked, nonogram };
  };


  const [gameState, setGameState] = useState(getStoredStats().gameState); // 'paused', 'playing', 'won'
  const [boardsCompleted, setBoardsCompleted] = useState(getStoredStats().boardsCompleted);
  const [boardsUnlocked, setBoardsUnlocked] = useState(getStoredStats().boardsUnlocked);
  const [fastestTime, setFastestTime] = useState(getStoredStats().fastestTime);
  const [rating, setRating] = useState(getStoredStats().rating);
  const [stageUnlocked, setStageUnlocked] = useState(getStoredStats().stageUnlocked);
  const [difficulty, setDifficulty] = useState(getStoredStats().difficulty);
  const [nonogram, setNonogram] = useState(getStoredStats().nonogram);
  const [currentBoard, setCurrentBoard] = useState(getStoredStats().currentBoard);




  const updateStats = () => {
    const stats = getStoredStats();

    setGameState(stats.gameState)
    setCurrentBoard(stats.currentBoard);
    setBoardsCompleted(stats.boardsCompleted);
    setBoardsUnlocked(stats.boardsUnlocked)
    setFastestTime(stats.fastestTime);
    setRating(stats.rating);
    setStageUnlocked(stats.stageUnlocked);
    setDifficulty(stats.difficulty);
  }

  // Update stats in localStorage
  const updateStatsInLocalStorage = (bC, rat) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.gameVersion, gameVersion);
    localStorage.setItem(LOCAL_STORAGE_KEYS.gameState, gameState);
    localStorage.setItem(LOCAL_STORAGE_KEYS.boardsCompleted, JSON.stringify(bC));
    localStorage.setItem(LOCAL_STORAGE_KEYS.boardsUnlocked, JSON.stringify(boardsUnlocked));
    localStorage.setItem(LOCAL_STORAGE_KEYS.fastestTime, JSON.stringify(fastestTime));
    localStorage.setItem(LOCAL_STORAGE_KEYS.rating, rat);
    localStorage.setItem(LOCAL_STORAGE_KEYS.stageUnlocked, stageUnlocked);
    localStorage.setItem(LOCAL_STORAGE_KEYS.difficulty, difficulty);
    localStorage.setItem(LOCAL_STORAGE_KEYS.nonogram, JSON.stringify(nonogram));
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentBoard, JSON.stringify(currentBoard));

    updateStats()
  };

  const updateBoard = (board = currentBoard) => {
    setCurrentBoard(board)
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentBoard, JSON.stringify(board));
  }


  useEffect(() => {
    // Initialize stats from localStorage when the app starts
    if (gameVersion !== getStoredStats().gameVersion) { }// clear data
    updateStats()
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.gameState, gameState);
  }, [gameState]);





  // Clear players board
  const clearBoard = (size = nonogram.size) => {
    globalSettings.clearBoard = !globalSettings.clearBoard;
    var cleanBoard = create2DArray(size, 0)
    setCurrentBoard(cleanBoard)
    return cleanBoard
  }

  /**
  * Starts a new game with the specified size.
  * Initializes the game state, resets the score, generates a new nonogram,
  * and clears the game board.
  *
  * @function
  * @param {number} size - The size of the nonogram grid. This determines the dimensions of the nonogram.
  * @returns {void} void
  */
  const startNewGame = (size) => {
    setGameState('playing');
    setScore(0);
    var newNonogram = generateNonogram(size, difficulty);
    setNonogram(newNonogram); // New nonogram
    var cleanBoard = clearBoard(size) // clear board
    
    localStorage.setItem(LOCAL_STORAGE_KEYS.nonogram, JSON.stringify(newNonogram));
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentBoard, JSON.stringify(cleanBoard));
  };

  // Check if all cells are correctly filled
  const checkWin = () => {
    return compareNonograms(currentBoard, nonogram.nonogramArr);
  };

  const updateBoardsCompleted = () => {
    var tempBC = { ...boardsCompleted }

    if (Array.isArray(tempBC[nonogram.size])) {
      tempBC[nonogram.size].push(currentBoard);
    } else {
      tempBC[nonogram.size] = [currentBoard];
    }

    setBoardsCompleted(tempBC)
    return tempBC
  }

  const updateRating = () => {
    
    //Update rating
    //     Formula for max score per board:
    // x = board size
    // 62.5x^2−125x = max score
  
    // Formula for score based on time:
    // max = max score for board, s = seconds, steepness = number at which score halfs
    // max * ((11/20)^(s/8))
    // Needs to be tweaked for each board
  
    var max_possiable_score = 62.5 * Math.pow(nonogram.size, 2) - 125 * nonogram.size
    var newRating = rating + max_possiable_score
    return newRating
  }

  // Handle the game won state
  const handleGameWon = () => {
    var isCorrect = checkWin()
    if (!isCorrect || gameState === "won") return false

    setGameState('won');

    // Update fastest time if applicable

    // Update stats in localStorage
    updateStatsInLocalStorage(updateBoardsCompleted(), updateRating());
    return true
  };









  return (
    <GameContext.Provider value={{
      gameState,
      setGameState,
      rating,
      setRating,
      globalSettings,
      nonogram,
      boardsUnlocked,
      currentBoard,
      updateBoard,
      startNewGame,
       
      clearBoard,
      handleGameWon
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use game context
const useGameContext = () => useContext(GameContext);

export default useGameContext;