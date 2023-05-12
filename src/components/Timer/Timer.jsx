import React, { useState, useEffect } from "react";
import { BsClockFill } from "react-icons/bs";
import "./style.scss";
const Timer = () => {
  // initialize timeLeft with the seconds prop
  const d = new Date();

  const [minute, setMinute] = useState(60 - d.getMinutes());
  const [second, setSecond] = useState(60 - d.getSeconds());
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(intervalId);
        } else {
          setMinute(minute - 1);
          setSecond(59);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [minute, second]);

  return (
    <div>
      <div className="timer">
        <span>
          <BsClockFill /> 00:{minute.toString().length === 1 ? 0 : ""}
          {minute}:{second.toString().length === 1 ? 0 : ""}
          {second}
        </span>
      </div>
    </div>
  );
};

export default Timer;
