import React, { useState, useEffect } from "react";
import Fab from '@mui/material/Fab';

const Timer = ({timeLeft = 30}) => {
  const [seconds, setSeconds] = useState(timeLeft);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds === 0) {
      setIsActive(false);
    } else if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    
      <Fab color="secondary" variant="extended">
        {seconds}
      </Fab>
    
    
  );
};

export default Timer;
