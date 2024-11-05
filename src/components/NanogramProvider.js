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
		let nanogramArr = create2DArray(size,()=>Math.round(Math.random()))
		let clueRows = createRowClues(nanogramArr)
		let clueCols = createColumnClues(nanogramArr)

    setNanogram({...nanogram, ...{
			size: size,
			nanogramArr: nanogramArr,
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