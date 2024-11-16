import "./Clue.css"
import React, { useState, createContext, useEffect } from 'react';
import useGameContext from '../../../contexts/GameContext'

import {create2DArray} from '../../Array_functions/arrayFunctions'

export default function Clue(props){
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
		clearGame,
		clearBoard
	} = useGameContext();

	let clueNumber = props.direction === "row" ? nonogram.clue.rows[props.index] : nonogram.clue.cols[props.index] 
	clueNumber = typeof clueNumber === "undefined" ? create2DArray(nonogram.size,0) : clueNumber
	let isBtmRow = props.direction === "col"? true : false
	let displayedClue = clueNumber.map((num,i)=>{return(<div key={i}>{num}<br /></div>)})


	return (
		<div className={"clue " + (Number(props.index)%2 === 0?"odd":"even")}
			index={props.index}
		 	style={{minHeight: (400/props.size)+"px", minWidth: (400/props.size)+"px", fontSize: (320/props.size)+"px"}}
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
	