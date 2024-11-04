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

let MouseDrawTileStateContext = 0;
let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

export default function Tile(props){

  const [nanogram, setNewNanogram] = useNanogramContext();
  const [game_stats, updateGStats] = useStatsContext();
  const [selectedState, setSelect] = useState(0)


  var onClickHandler = (e)=>{
    toggleTileState(e.button == 2)
    
  }

  var toggleTileState = (isRightClick) =>{
    MouseDrawTileStateContext = isRightClick?
    -1 :
    selectedState == 1 ? 0 : selectedState + 1 

    setSelect(MouseDrawTileStateContext)
  }

  var onMouseHoverTile = (e) => {
    if (!mouseDown) return
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
      <i className="fa  fa-close" hidden></i>
    </div>
  )
  
}
