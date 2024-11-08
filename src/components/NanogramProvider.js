import { useState, createContext, useContext, useEffect } from 'react'
import {useStatsContext, save_stats} from './StatsProvider'

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

		const createNanogramArr = () => create2DArray(size,()=>Math.round(Math.random()))

		//Create Nonogram
		let nanoArr = createNanogramArr()
		let clueRows = createRowClues(nanoArr)
		let clueCols = createColumnClues(nanoArr)

		//Make Nonos easir
		//Difficulty checker. intToFind = to minium number must exsist in 2d array
		let isCluesEasy = (array2D, intToFind) => array2D.some(subArray => subArray.some(num => num >= intToFind))
		
		let minimumClueTarget = Math.ceil(size/2)

		while(!(isCluesEasy(clueRows, minimumClueTarget) && isCluesEasy(clueCols,minimumClueTarget))){
			nanoArr = createNanogramArr()
			clueRows = createRowClues(nanoArr)
			clueCols = createColumnClues(nanoArr)
		}
		// console.log(isCluesEasy(clueRows,minimumClueTarget) && isCluesEasy(clueCols,minimumClueTarget))

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

	//Update Stats on completion
	useEffect(()=>{
		if(game_stats.complete_puzzle === false) return

		const updated_stats = {...game_stats}

		const newCompletions = {...game_stats.numberOfCompletions}
		let key = nanogram.size +""
		newCompletions[key] = newCompletions[key]? newCompletions[key] : 0
		newCompletions[key] += 1

		updated_stats.numberOfCompletions = {...newCompletions}
		// updateGStats({...game_stats, numberOfCompletions:{...newCompletions}})

		const updatedCurrencies = {...game_stats.currencies}
		updatedCurrencies["basicMonies"] = updatedCurrencies["basicMonies"]? updatedCurrencies["basicMonies"] : 0
		updatedCurrencies["basicMonies"] += nanogram.size - game_stats.default_board_size + 1

		updated_stats.currencies = {...updatedCurrencies}
		// updateGStats({...game_stats, currencies:{...updatedCurrencies}})

		updateGStats({...updated_stats})
		save_stats(updated_stats)
		
	},[game_stats.complete_puzzle])
	
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