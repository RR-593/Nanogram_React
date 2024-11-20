import React from 'react';
import useTimer from '../../contexts/TimerContext'; // Import the useTimer hook from context

function Timer() {
  const { time, isActive } = useTimer(); // Destructure the state and functions from context

  // Function to format time as hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(time)}</p>
      <button>{isActive ? 'Pause' : 'Resume'}</button>
    </div>
  );
}

export default Timer;
