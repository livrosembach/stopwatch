import React, { useEffect, useRef, useState } from 'react';
import './StopWatch.css';

const DigitRoller = ({ value }) => {
  const digitRef = useRef(null);
  const [height, setHeight] = useState(60);
  
  useEffect(() => {
    if (digitRef.current) {
      setHeight(digitRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="digit-container" ref={digitRef}>
      <div className="digit-roller">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div 
            key={num} 
            className={`digit ${num === parseInt(value, 10) ? 'active' : ''}`}
            style={{ transform: `translateY(${-parseInt(value, 10) * height}px)` }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); 
    }
  };

  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const minutes = Math.floor(time / 60000)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((time % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  const milliseconds = Math.floor((time % 1000) / 10)
    .toString()
    .padStart(2, '0');

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-display">
        <div className="digits-group">
          <DigitRoller value={minutes[0]} />
          <DigitRoller value={minutes[1]} />
        </div>
        <div className="separator">:</div>
        <div className="digits-group">
          <DigitRoller value={seconds[0]} />
          <DigitRoller value={seconds[1]} />
        </div>
        <div className="separator">.</div>
        <div className="digits-group ms-group">
          <DigitRoller value={milliseconds[0]} />
          <DigitRoller value={milliseconds[1]} />
        </div>
      </div>
      
      <div className="controls">
        <button onClick={running ? pause : start} className={running ? 'running' : ''}>
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={reset}>Resetar</button>
      </div>
    </div>
  );
};

export default StopWatch;
