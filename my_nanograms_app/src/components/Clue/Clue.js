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
			let isBtmRow = this.props.vert == "true"? true : false
			let displayedClue = clueNumber.map((num,i)=>{return(<div key={i}>{num}<br /></div>)})
			return (
				<div className={"clue " + (Number(this.props.index)%2 == 0?"odd":"even")}
					index={this.props.index}
				 	style={{minHeight: (400/this.props.size)+"px", minWidth: (400/this.props.size)+"px", fontSize: (320/this.props.size)+"px"}}
					clue={clueNumber.join(",")}
					onContextMenu={(e)=>{e.preventDefault()}}
					btmrow={isBtmRow+""}
				>
					<span className="number" btmrow={isBtmRow+""}>
						{displayedClue}
					</span>
					
				</div>
			)
		}
	}
	