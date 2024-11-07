import { useState, createContext, useContext, useEffect } from 'react'

const StatsContext = createContext()

const StatsProvider = ({ children }) => {
	const [game_stats, setGStats] = useState({
		save: false,
    clear: false,
		complete_puzzle: false,
		default_board_size: 4,
		max_board_size: 25,
		unlocks: {
			version: false,
			currencies: []
		},
		numberOfCompletions: {},
		currencies: {
			basicMonies: 0
		}
  })
  const updateGStats = (newValue) => {
    setGStats(newValue);
  };

	useEffect(() => {
		const got_stats = JSON.parse(localStorage.getItem('stats'));
		got_stats.complete_puzzle = false
		if (got_stats) setGStats(got_stats);
	}, []);

	return (
		<StatsContext.Provider value={[game_stats, updateGStats]}>
			{children}
		</StatsContext.Provider>
	);
};

export const useStatsContext = () => {
	return useContext(StatsContext);
};

export const save_stats = (game_stats) => {
	console.log(game_stats);
	localStorage.setItem('stats', JSON.stringify(game_stats));
}

export default StatsProvider