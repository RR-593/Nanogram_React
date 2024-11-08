import React,{useEffect} from 'react';
import {useStatsContext} from '../StatsProvider'
import {useNanogramContext} from '../NanogramProvider'
import {useActiveBoardContext} from '../ActiveBoardProvider'

import './CurrencyBox.css'


const CurrencyBox = () => {

  const [game_stats, updateGStats] = useStatsContext();
  const [nanogram, setNewNanogram] = useNanogramContext();
  const [board, updateBoard] = useActiveBoardContext();
	
	return (
		<div className="currencyBox">
			<span className="basicMonies"></span>
			💰: {game_stats.currencies.basicMonies}
		</div>
	);
};

export default CurrencyBox;