import { useState, createContext, useContext } from 'react'

const StatsContext = createContext()

const StatsProvider = ({ children }) => {
	const [game_stats, setGStats] = useState({
    clear: false,
		complete_puzzle: false,
		default_board_size: 4,
		max_board_size: 25
  })
  const updateGStats = (newValue) => {
    setGStats(newValue);
  };

	return (
		<StatsContext.Provider value={[game_stats, updateGStats]}>
			{children}
		</StatsContext.Provider>
	);
};

export const useStatsContext = () => {
	return useContext(StatsContext);
};

export default StatsProvider