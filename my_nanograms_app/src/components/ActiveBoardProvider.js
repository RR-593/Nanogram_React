import { useState, createContext, useContext,useEffect } from 'react'
import {useNanogramContext} from './NanogramProvider'

const ActiveBoardContext = createContext()

const StatsProvider = ({ children }) => {
  const [nanogram, setNewNanogram] = useNanogramContext();
	const [board, setBoard] = useState();

  const updateBoard = (board) => {
    setBoard(board);
  };

	useEffect(()=>{

		setBoard(Array.from({ length: nanogram.size }, () => Array.from({ length: nanogram.size }, () => 0)))
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