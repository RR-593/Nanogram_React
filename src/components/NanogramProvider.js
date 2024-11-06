import { useState, createContext, useContext, useEffect } from 'react'
import {useStatsContext} from './StatsProvider'

import {create2DArray, createColumnClues, createRowClues, compare2DArrays, toString2DArray} from './helper_funcs/arrayFunctions'

const NanogramContext = createContext()

const NanogramProvider = ({ children }) => {
  const [game_stats, updateGStats] = useStatsContext();
	const [nanogram, setNanogram] = useState({
		size: 0,
		nanogramArr: [],
		clue: {
			rows: [],
			cols: []
		}
	})
	
  const setNewNanogram = (nanogramValues) => {
		let size = nanogramValues.size

		let createNanogramArr = () => create2DArray(size,()=>Math.round(Math.random()))

		let nanoArr = createNanogramArr()
		let clueRows = createRowClues(nanoArr)
		let clueCols = createColumnClues(nanoArr)

		//Return true if a number greater than target exists in 2d array
		let isCluesEasy = (array2D, intToFind) => array2D.some(subArray => subArray.some(num => num >= intToFind))
		
		let minimumClueTarget = Math.ceil(size/2)

		while(!(isCluesEasy(clueRows, minimumClueTarget) && isCluesEasy(clueCols,minimumClueTarget))){
			nanoArr = createNanogramArr()
			clueRows = createRowClues(nanoArr)
			clueCols = createColumnClues(nanoArr)
		}
		console.log(isCluesEasy(clueRows,Math.floor(size/2)+1) && isCluesEasy(clueCols,Math.floor(size/2)+1))

    setNanogram({...nanogram, ...{
			size: size,
			nanogramArr: nanoArr,
			clue: {
				rows: clueRows,
				cols: clueCols
			}
		}});
  };


	useEffect(() => {
		setNewNanogram({size: game_stats.default_board_size})
	}, []);
	
	return (
		<NanogramContext.Provider value={[nanogram, setNewNanogram]}>
			{children}
		</NanogramContext.Provider>
	);
};


export const useNanogramContext = () => {
	return useContext(NanogramContext);
};

export default NanogramProvider