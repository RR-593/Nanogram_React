import React, { useState, useEffect } from 'react';
import { useStatsContext, save_stats } from '../../Providers/StatsProvider'

import './Version.css'

const Version = () => {
	const [game_stats, updateGStats] = useStatsContext();
	const [versionDiv, setversionDiv] = useState(<></>);

	let buyVersionDisplay = () => {
		const updated_stats = JSON.parse(localStorage.getItem('stats'));
		if (!(updated_stats.currencies.basicMonies >= 3)) return

		updated_stats.currencies.basicMonies -= 3
		updated_stats.unlocks.version = true

		updateGStats({...updated_stats})

		save_stats(game_stats)
	}

	useEffect(() => {
		if (game_stats.unlocks.version === false) {
			setversionDiv(
				<button onClick={buyVersionDisplay}>
					<span>💰 3 : Unlock</span>
				</button>
			)
			return
		}

		setversionDiv(
			<div className="versionDiv">
				<h3>---  V1.1  ---</h3>
				<p>
					New fetures:
				</p>
				<ul>
					<li>Gain currency apon completeing Nonogram</li>
					<li>Unlockable Version Display</li>
				</ul>
			</div>
		)
	}, [game_stats.unlocks.version]);

	return (
		<div className="versionBox">
			{versionDiv}
		</div>
	);
};

export default Version;