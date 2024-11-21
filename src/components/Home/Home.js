// import React,{useState, useEffect} from 'react';
// import useGameContext from '../../contexts/GameContext'
import HomeButtons from '../HomeButtons/HomeButtons';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
import './Home.css';

function Home() {

  return (
    <div className="home-container">
        <div className="score-recentBoard-container"> 
					<ScoreDisplay/>
				</div>
        <HomeButtons />
        <div className="BestBoards"></div>
    </div>
  );
}

export default Home;