  /*
  * tile
  * -1 = x
  * 0  = clean
  * 1  = Selected
  */
import "./Tile.css"
import React, { useState, useEffect } from 'react';
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import {useActiveBoardContext} from '../ActiveBoardProvider'


let MouseDrawTileStateContext = 0;
let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

export default function Tile(props){
  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  const [board, updateBoard] = useActiveBoardContext();
  const [selectedState, setSelect] = useState(0)


  var onClickHandler = (e)=>{
    toggleTileState(e.button == 2,e.shiftKey)
  }

  var toggleTileState = (isRightClick,isShift) =>{
    MouseDrawTileStateContext = isRightClick?
    selectedState ==  0 ? -1 : 0 :
    isShift? -2:
    selectedState ==  1 ?  0 : 1

    updateSelect()
  }

  var onMouseHoverTile = (e) => {
    if (!mouseDown) return
    updateSelect()
  }

  var updateSelect = () =>{
    let boardCopy = board
    boardCopy[props.id[0]][props.id[1]] = MouseDrawTileStateContext == 1 ? 1 : 0
    updateBoard(boardCopy)
    setSelect(MouseDrawTileStateContext)
  }

  useEffect(()=>{
    setSelect(0)
  },[game_stats.clear,nanogram])



  let selected = selectedState
  let size = Number(nanogram.size) > 0 ? nanogram.size : game_stats.default_board_size
  return (
    <div className="tile" 
      style = {{minHeight: (400/size)+"px", minWidth: (400/size)+"px", fontSize: (320/size)+"px"}}
      state = {selected} 
      onMouseDown = {onClickHandler}
      onContextMenu = {(e)=>{e.preventDefault()}}
      onMouseEnter = {onMouseHoverTile}
    >
      <i className={("fa  fa-"+(selected == -1 ? "close" : "question"))} hidden={!(selected <= -1)}></i>
    </div>
  )
  
}
