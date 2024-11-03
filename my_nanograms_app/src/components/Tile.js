  /*
  * tile
  * -1 = x
  * 0  = clean
  * 1  = Selected
  */
import "./Tile.css"
import React, { useState, createContext } from 'react';

export let MouseDrawTileStateContext = 0;
export let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

export default class Tile extends React.Component{
  
  constructor(props) {
    super(props);
    
    this.state = {
      clue: props.clue? props.clue: false,
      selected: 0
    }
  }


  onClickHandler = (e)=>{
    this.toggleTileState(e.button == 2)
  }

  toggleTileState = (isRightClick) =>{
    MouseDrawTileStateContext = isRightClick?
    this.state.selected == -1 ? 1 : this.state.selected - 1 :
    this.state.selected == 1 ? -1 : this.state.selected + 1 

    this.setToMouse(MouseDrawTileStateContext)
  }

  onMouseHoverTile = (e) => {
    if (!mouseDown) return
    this.setToMouse(MouseDrawTileStateContext)
  }

  setToMouse(selected){
    this.setState({ selected: selected })
  }


  render() {
    let selected = this.state.selected
    let clue = this.state.clue 
    return (
        <div className="tile" 
          state={selected} 
          clue={clue} 
          {...(clue == "true" ?{}:{
            onMouseDown: this.onClickHandler,
            onContextMenu: (e)=>{e.preventDefault()},
            onMouseEnter: this.onMouseHoverTile
          })}
          // onMouseDown={this.onClickHandler} 
          // onContextMenu={(e)=>{e.preventDefault()}}
          // onMouseEnter={this.onMouseHoverTile}
          style={{minHeight: (400/this.props.size)+"px", minWidth: (400/this.props.size)+"px", fontSize: (320/this.props.size)+"px"}}
        >
          <i className="fa  fa-close" hidden></i>
        </div>
      )
  }
}
