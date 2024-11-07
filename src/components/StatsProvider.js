import { useState, createContext, useContext, useEffect } from 'react'

const StatsContext = createContext()

const StatsProvider = ({ children }) => {
	const [game_stats, setGStats] = useState({
    clear: false,
		complete_puzzle: false,
		default_board_size: 4,
		max_board_size: 25,
		numberOfCompletions: {},
  })
  const updateGStats = (newValue) => {
    setGStats(newValue);
  };

	useEffect(() => {
		const got_stats = JSON.parse(localStorage.getItem('game_stats'));
		if (got_stats) setGStats(got_stats);
	}, []);

	useEffect(() => {
		console.log(game_stats)
		console.log("stored")
		localStorage.setItem('stats', JSON.stringify(game_stats));
	}, [game_stats.numberOfCompletions]);

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