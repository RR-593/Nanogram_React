import React from 'react';
import GameTitle from '../components/GameTitle/GameTitle';
import Home from '../components/Home/Home';

function TitlePage() {
  return (
    <div className="title-page">
      <GameTitle/>
      <Home/>
    </div>
  );
}

export default TitlePage;