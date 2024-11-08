import "./Clue.css"
import React, { useState, createContext, useEffect } from 'react';
import {useNanogramContext} from '../NanogramProvider'

import {create2DArray} from '../helper_funcs/arrayFunctions'

export default function Clue(props){
	const [nanogram, setNewNanogram] = useNanogramContext();

	let clueNumber = props.direction === "row" ? nanogram.clue.rows[props.index] : nanogram.clue.cols[props.index] 
	clueNumber = typeof clueNumber === "undefined" ? create2DArray(nanogram.size,0) : clueNumber
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
	