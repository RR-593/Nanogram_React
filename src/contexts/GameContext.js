import React, { createContext, useState, useContext, useEffect } from 'react';
import generateNonogram from '../components/generateNonogram';
import { compareNonograms, create2DArray } from '../components/Array_functions/arrayFunctions'
import useTimer from './TimerContext';
import { useLocation } from 'react-router-dom';


// Create context for game state
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
  const [gameVersion, setGameVersion] = useState("V2.0.0"); // this is used to reset people data so nothing breaks, increment number for fresh reset

  const location = useLocation()
  const { time, resetTimer, setIsActive } = useTimer()
  const [gameTime, setGameTime] = useState(time);

  useEffect(() => {
    setGameTime(time);
  }, [time]);

  const [scoreGained, setScoreGained] = useState(0);

  useEffect(() => {
    if (location.pathname !=="/Game") resetTimer(); 
  }, [location]);

  const [globalSettings, setGlobalSettings] = useState({
    clearBoard: false,
    default_board_size: 4,
    max_board_size: 25,
    stages: [
      {
        name: "noob",
        rankReq: 0,
        newBoards: [],
        action: () => { }
      },
      {
        name: "tin",
        rankReq: 1,
        newBoards: [],
        action: () => { }
      },
      {
        name: "iron",
        rankReq: 500,
        newBoards: [6, 8],
        action: () => { }
      },
      {
        name: "bronze",
        rankReq: 2000,
        newBoards: [],
        action: () => { }
      }, {
        name: "silver",
        rankReq: 10000,
        newBoards: [10, 12],
        action: () => { }
      },
    ]
  });


  // Local storage keys
  const LOCAL_STORAGE_KEYS = {
    gameVersion: 'gameVersion',
    gameState: 'gameState',
    boardsCompleted: 'boardsCompleted',
    boardsUnlocked: 'boardsUnlocked',
    fastestTime: 'fastestTime',
    rating: 'rating',
    rank: 'rank',
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
    const boardsUnlocked = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.boardsUnlocked)) || [globalSettings.default_board_size];
    const fastestTime = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.fastestTime)) || {};
    const rating = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.rating), 10) || 0;
    const rank = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.rank)) || globalSettings.stages[0];
    const stageUnlocked = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.stageUnlocked), 10) || 0;
    const difficulty = localStorage.getItem(LOCAL_STORAGE_KEYS.difficulty) || "normal";
    const nonogram = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.nonogram)) || generateNonogram(globalSettings.default_board_size, difficulty);
    const currentBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.currentBoard)) || create2DArray(globalSettings.default_board_size, 0);
    return { gameVersion, gameState, boardsCompleted, fastestTime, rating, stageUnlocked, difficulty, currentBoard, boardsUnlocked, nonogram, rank };
  };

  const [gameState, setGameState] = useState(getStoredStats().gameState); // 'paused', 'playing', 'won'
  const [boardsCompleted, setBoardsCompleted] = useState(getStoredStats().boardsCompleted);
  const [boardsUnlocked, setBoardsUnlocked] = useState(getStoredStats().boardsUnlocked);
  const [fastestTime, setFastestTime] = useState(getStoredStats().fastestTime);
  const [rating, setRating] = useState(getStoredStats().rating);
  const [rank, setRank] = useState(getStoredStats().rank);
  const [stageUnlocked, setStageUnlocked] = useState(getStoredStats().stageUnlocked);
  const [difficulty, setDifficulty] = useState(getStoredStats().difficulty);
  const [nonogram, setNonogram] = useState(getStoredStats().nonogram);
  const [currentBoard, setCurrentBoard] = useState(getStoredStats().currentBoard);

  const updateStats = () => {
    const stats = getStoredStats();

    setGameState(stats.gameState);
    setCurrentBoard(stats.currentBoard);
    setBoardsCompleted(stats.boardsCompleted);
    setBoardsUnlocked(stats.boardsUnlocked)
    setFastestTime(stats.fastestTime);
    setRating(stats.rating);
    setRank(stats.rank);
    setStageUnlocked(stats.stageUnlocked);
    setDifficulty(stats.difficulty);
  }

  // Update stats in localStorage
  const updateStatsInLocalStorage = (bC, rat, gState) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.gameVersion, gameVersion);
    localStorage.setItem(LOCAL_STORAGE_KEYS.gameState, gState);
    localStorage.setItem(LOCAL_STORAGE_KEYS.boardsCompleted, JSON.stringify(bC));
    localStorage.setItem(LOCAL_STORAGE_KEYS.boardsUnlocked, JSON.stringify(boardsUnlocked));
    localStorage.setItem(LOCAL_STORAGE_KEYS.fastestTime, JSON.stringify(fastestTime));
    localStorage.setItem(LOCAL_STORAGE_KEYS.rating, rat);
    localStorage.setItem(LOCAL_STORAGE_KEYS.rank, JSON.stringify(rank));
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.boardsUnlocked, JSON.stringify(boardsUnlocked));
  }, [boardsUnlocked]);



  // Clear players board
  const clearBoard = (size = nonogram.size) => {
    globalSettings.clearBoard = !globalSettings.clearBoard;
    var cleanBoard = create2DArray(size, 0)
    setCurrentBoard(cleanBoard)
    return cleanBoard
  }

  const pauseGame = () => {
    setIsActive(false)
    setGameState('pause');
  }

  const resumeGame = () => {
    setIsActive(true)
    setGameState('playing');
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
    resetTimer()
    resumeGame()
    var newNonogram = generateNonogram(size, difficulty);
    setNonogram(newNonogram); // New nonogram
    var cleanBoard = clearBoard(size) // clear board

    localStorage.setItem(LOCAL_STORAGE_KEYS.nonogram, JSON.stringify(newNonogram));
    localStorage.setItem(LOCAL_STORAGE_KEYS.currentBoard, JSON.stringify(cleanBoard));
  };

  // Check if all cells are correctly filled
  const checkWin = () => compareNonograms(currentBoard, nonogram.nonogramArr);

  const updateBoardsCompleted = () => {
    var tempBC = { ...boardsCompleted }

    if (Array.isArray(tempBC[nonogram.size])) {
      tempBC[nonogram.size].push({ board: currentBoard, time: gameTime });
    } else {
      tempBC[nonogram.size] = [{ board: currentBoard, time: gameTime }];
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
    var newScore = Math.floor(max_possiable_score * Math.pow((11 / 20), ((gameTime / 100) / 8)))
    setScoreGained(newScore)
    var newRating = rating + newScore

    return newRating
  }

  // Handle the game won state
  const handleGameWon = () => {
    var isCorrect = checkWin()
    console.log('isCorrect: ' + isCorrect + ", gameState: " + gameState);
    if (!isCorrect || gameState === "won") return false

    // Update fastest time 

    // Update stats in localStorage
    updateStatsInLocalStorage(updateBoardsCompleted(), updateRating(), 'won');

    setIsActive(false)
    return true
  };




  return (
    <GameContext.Provider value={{
      scoreGained,
      gameState,
      rating,
      setRating,
      rank,
      setRank,
      globalSettings,
      nonogram,
      boardsUnlocked,
      setBoardsUnlocked,
      currentBoard,
      updateBoard,
      startNewGame,
      clearBoard,
      handleGameWon,
      pauseGame,
      resumeGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use game context
const useGameContext = () => useContext(GameContext);

export default useGameContext;