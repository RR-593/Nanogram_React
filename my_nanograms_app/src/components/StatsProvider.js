import { useState, createContext, useContext } from 'react'

const StatsContext = createContext()

const StatsProvider = ({ children }) => {
	const [game_stats, setGStats] = useState({
    board_count: 0
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