import { useState, createContext, useContext,useEffect } from 'react'
import {useNanogramContext} from './NanogramProvider'

import {create2DArray} from './helper_funcs/arrayFunctions'

const ActiveBoardContext = createContext()

const StatsProvider = ({ children }) => {
  const [nanogram, setNewNanogram] = useNanogramContext();
	const [board, setBoard] = useState([[]]);

  const updateBoard = (board) => {
    setBoard(board);
  };

	useEffect(()=>{

		setBoard(create2DArray(nanogram.size,0))
	},[nanogram])

	return (
		<ActiveBoardContext.Provider value={[board, updateBoard]}>
			{children}
		</ActiveBoardContext.Provider>
	);
};

export const useActiveBoardContext = () => {
	return useContext(ActiveBoardContext);
};

export default StatsProvider