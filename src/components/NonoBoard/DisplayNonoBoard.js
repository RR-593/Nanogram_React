import { useEffect, useState, useContext } from 'react'
import './DisplayNonoBoard.css';
import useGameContext from '../../contexts/GameContext'

import $ from 'jquery'
import Tile from './Tile/Tile'
import Clue from './Clue/Clue'

const DisplayNanoBoard = () => {
  const {
		gameState,
		setGameState,
		score,
		setScore,
		globalSettings,
		nonogram,
		currentBoard,
		setCurrentBoard,
		startNewGame,
		 
		clearBoard
	} = useGameContext();

	var boardSize = nonogram.size ? nonogram.size : globalSettings.default_board_size

	useEffect(() => {
		$(".tile, .clue").css("border-width", 4 - (nonogram.size >= 10 ? parseInt(nonogram.size.toString()[0]) : 0));
	}, [nonogram])


  return (
    <div className="nonogram-board">
      {[...Array(boardSize)].map((_, rowIndex) =>
        <div key={rowIndex} className="row">
          {[...Array(boardSize)].map((_, colIndex) => <Tile key={colIndex} id={[rowIndex, colIndex]} />)}
          <Clue size={boardSize} index={rowIndex} direction="row" />
        </div>
      )}
      <div className="row">
        {[...Array(boardSize)].map((_, index) => (<Clue key={index} size={boardSize} index={index} direction="col" />))}
      </div>
    </div>
  )

}

export default DisplayNanoBoard;