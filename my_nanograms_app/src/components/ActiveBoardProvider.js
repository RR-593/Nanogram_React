import { useState, createContext, useContext } from 'react'

const ActiveBoardContext = createContext()

const StatsProvider = ({ children }) => {
	const [board, setBoard] = useState([]);

  const updateBoard = (newValue) => {
    setBoard([...Array(boardSize)].map((_, index) => <Tile key={index} size={boardSize} clear={game_stats.board_count} />));
  };

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