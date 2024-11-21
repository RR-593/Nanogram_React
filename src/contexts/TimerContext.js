import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the TimerContext
const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false); 

  // Effect to handle the timer update
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); // Update every second
    } else {
      clearInterval(interval);
    }

    // Cleanup the interval on unmount or when the timer is paused
    return () => clearInterval(interval);
  }, [isActive]);

  // Function to toggle the timer's active state
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };


  return (
    <TimerContext.Provider value={{ time, isActive, setIsActive, toggleTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);
export default useTimer;
