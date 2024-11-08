import { useState, createContext, useContext, useEffect } from 'react'

const StatsContext = createContext()

const StatsProvider = ({ children }) => {
	const game_ver = "V1.2.2" // this is used to reset people data so nothing breaks, increment number for fresh reset
	const defualt_game_stats = {
		version: game_ver,
		load: false,
		save: false,
    clear: false,
		complete_puzzle: false,
		default_board_size: 4,
		max_board_size: 25,
		unlocks: {
			version: false,
			difficulty: [],
			currencies: []
		},
		difficulty: "normal",
		numberOfCompletions: {},
		currencies: {
			basicMonies: 0
		}
  }
	const [game_stats, setGStats] = useState(defualt_game_stats)
  const updateGStats = (newValue) => {
    setGStats(newValue);
  };

	useEffect(() => {

		const got_stats = JSON.parse(localStorage.getItem('stats'));
		console.log(got_stats)
		if (got_stats && got_stats.version === game_ver) {
			got_stats.complete_puzzle = false
			setGStats(got_stats);
		}
		setGStats(defualt_game_stats);
		save_stats(defualt_game_stats);
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