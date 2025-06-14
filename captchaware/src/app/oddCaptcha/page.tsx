"use client";

import { useState, useEffect } from "react";

const OddNumberComponent = ({ number }: { number: number }) => {
  const [waitTime, setWaitTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitTime(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>{waitTime ? number + 1 : number}</p>
      <p>
        {waitTime
          ? "Oops, randomization had some delay. Try again !"
          : "Well done! You are a human."}
      </p>
    </div>
  );
};

export default function OddCaptcha() {
  const [luckNumber, setLuckNumber] = useState(0);

  const handleClickLuck = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    setLuckNumber(randomNumber);
  };

  return (
    <div className="space-y-8">
      <p>You need to do odd to verify if you are human.</p>
      <div className="border-2 border-solid border-blue-200 w-fit">
        <button onClick={handleClickLuck} type="button">Random</button>
      </div>
      <div>
        {luckNumber % 2 === 0 ? (
          <p>{luckNumber}</p>
        ) : (
          <OddNumberComponent number={luckNumber} />
        )}
      </div>
    </div>
  );
}

