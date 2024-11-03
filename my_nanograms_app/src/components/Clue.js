  /*
  * tile
  * -1 = x
  * 0  = clean
  * 1  = Selected
  */
	import "./Clue.css"
	import React, { useState, createContext } from 'react';
	
	
	export default class Clue extends React.Component{
		
		constructor(props) {
			super(props);
	
			this.state = {
				clueNumber: []
			}
		}
	
	
		render() {
			let clueNumber = typeof this.props.clueNumber === "undefined"? [] : this.props.clueNumber
			return (
				<div className={"clue " + (Number(this.props.index)%2 == 0?"odd":"even")}
					index={this.props.index}
				 	style={{minHeight: (400/this.props.size)+"px", minWidth: (400/this.props.size)+"px", fontSize: (320/this.props.size)+"px"}}
					clue={clueNumber.join(",")}
					onContextMenu={(e)=>{e.preventDefault()}}
					btmrow={this.props.vert}
				>
					<span>{clueNumber.join(", ")}</span>
				</div>
			)
		}
	}
	