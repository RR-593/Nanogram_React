/*
* tile
* -1 = x
* 0  = clean
* 1  = Selected
*/
import "./Tile.css"
import React, { useState, useEffect } from 'react';
import useGameContext from '../../../contexts/GameContext'


let MouseDrawTileStateContext = 0;
let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

export default function Tile(props) {
  const {
    gameState,
    setGameState,
    score,
    setScore,
    globalSettings,
    nonogram,
    currentBoard,
    updateBoard,
    startNewGame,
    clearBoard
  } = useGameContext();

  var sateFromCurrentBoard = currentBoard[props.id[0]][props.id[1]] ? currentBoard[props.id[0]][props.id[1]] : 0

  const [selectedState, setSelect] = useState(sateFromCurrentBoard)
  // -2 ?
  // -1 X
  //  0 blank
  //  1 filled


  var onClickHandler = (e) => {
    toggleTileState(e.button === 2, e.shiftKey)
  }

  var toggleTileState = (isRightClick, isShift) => {
    MouseDrawTileStateContext = isRightClick ?
      selectedState === 0 ? -1 : 0 :
      isShift ? -2 :
        selectedState === 1 ? 0 : 1

    updateSelect()
  }

  var onMouseHoverTile = (e) => {
    if (!mouseDown) return
    updateSelect()
  }

  var updateSelect = () => {
    let boardCopy = currentBoard
    boardCopy[props.id[0]][props.id[1]] = MouseDrawTileStateContext === 1 ? 1 : 0
    updateBoard(boardCopy)
    setSelect(MouseDrawTileStateContext)
  }

  useEffect(() => {
    if (gameState !== "playing") return
    setSelect(0)
  }, [globalSettings.clearBoard])



  let selected = selectedState
  let size = Number(nonogram.size) > 0 ? nonogram.size : globalSettings.default_board_size
  return (
    <div className="tile"
      style={{ minHeight: (400 / size) + "px", minWidth: (400 / size) + "px", fontSize: (320 / size) + "px" }}
      state={selected}
      onMouseDown={onClickHandler}
      onContextMenu={(e) => { e.preventDefault() }}
      onMouseEnter={onMouseHoverTile}
    >
      <i className={("fa  fa-" + (selected === -1 ? "close" : "question"))} hidden={!(selected <= -1)}></i>
    </div>
  )

}
