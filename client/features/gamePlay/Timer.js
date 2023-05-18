import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [countdown, setCountdown] = useState(120); // Initial countdown value

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1); // Decrease countdown value
      }
    }, 1000); // Update countdown every second

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [countdown]);

  return <div>{countdown}</div>; // Display countdown on the UI
};

export default Timer;