  /*
  * tile
  * -1 = x
  * 0  = clean
  * 1  = Selected
  */
import "./Tile.css"
import React, { useState, useEffect } from 'react';

export let MouseDrawTileStateContext = 0;
export let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

export default function Tile(props){
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
  },[props.clear])



  let selected = selectedState
  let size = Number(props.size) > 0 ? props.size : 6
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
