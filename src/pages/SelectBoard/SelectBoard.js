import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import useGameContext from '../../contexts/GameContext'
import { Link } from 'react-router-dom';
import GameTitle from '../../components/GameTitle/GameTitle';
import './SelectBoard.css';

function SelectBoard() {
  const {
    globalSettings,
    boardsUnlocked,
    startNewGame
    } = useGameContext();

  const [selectedSize, setSelectedSize] = useState(globalSettings.default_board_size);

  const newGameAction = () => {
    startNewGame(selectedSize)
  }

  const displayBoardSize = () => {
    var inVal = $('.slider').val()
    var size = boardsUnlocked[inVal]
    if (typeof size !== 'number') return
    setSelectedSize(size);
  }

  var lockBarPercent = globalSettings.max_board_size
  if (boardsUnlocked.length <= 15) lockBarPercent = 15;
  if (boardsUnlocked.length <= 10) lockBarPercent = 10;

  var sBarWidth = boardsUnlocked.length / lockBarPercent * 98;
  var sLockedBarWidth = 100 - (boardsUnlocked.length / lockBarPercent * 100);

  useEffect(() => {
    $(".board-size").text(selectedSize + "x" + selectedSize);
  }, [selectedSize]);

  return (
    <div className="select-board-page">
      <GameTitle />
      <div className="select-board-box">
        <div className="board-selector-box">
          <span className="board-size"></span>
          <div className="slider-container">
            <div className="slider-back"></div>
            <input type="range" id="slider" onInput={displayBoardSize} min="0" max={boardsUnlocked.length - 1} className="slider" step="1" style={{ width: (sBarWidth) + "%" }} />
            <div className="locked-section" style={{ width: (sLockedBarWidth) + "%" }}></div>
            <div className="lock-box" style={{ left: (sBarWidth) + "%" }}>
              <div className="circle"></div>
              <i className="fa fa-lock lock"></i>
            </div>
          </div>
          <Link to="/game">
            <button className="board-select-submission" onClick={newGameAction}>Start</button>
          </Link>
        </div>
        <div className="example-board"></div>
      </div>
    </div>
  );
}

export default SelectBoard;

