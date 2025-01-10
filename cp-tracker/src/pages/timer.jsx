import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null); // State for countdown time
  const [isRunning, setIsRunning] = useState(false); // State to track if the timer is running

  const startTimer = () => {
    setTimeLeft(2 * 60 * 60); // Set time to 2 hours in seconds
    setIsRunning(true);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(timer);
      alert("Time's up!");
      setIsRunning(false);
    }
    return () => clearInterval(timer); // Cleanup interval on component unmount or timer stop
  }, [timeLeft, isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }} className="text-center">
      {!isRunning && (
        <button onClick={startTimer} style={{ padding: "10px 20px", fontSize: "16px" }} className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
          Start
        </button>
      )}
      {isRunning && (
        <div style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold" }} className="text-2xl font-bold">
          Time Left: {formatTime(timeLeft)}
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
