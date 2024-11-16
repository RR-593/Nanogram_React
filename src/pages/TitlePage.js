import React from 'react';
import { Link } from 'react-router-dom';

function TitlePage() {
  console.log("load")
  return (
    <div className="title-page">
      <h1>Nonogram Game</h1>
      <p>Welcome to the Nonogram puzzle game!</p>
      <Link to="/settings">
        <button>Settings</button>
      </Link>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default TitlePage;