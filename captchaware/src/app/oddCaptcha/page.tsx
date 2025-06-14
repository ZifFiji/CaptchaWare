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
      <p className="mb-4 flex items-center justify-center">{waitTime ? number + 1 : number}</p>
      <p className="mb-4 flex items-center justify-center">
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
    <div className="mb-4 flex h-screen flex-col items-center justify-center">
      <div>
      <p className="mb-4">You need to do odd to verify if you are human.</p>
      <div className="mb-4 flex items-center justify-center">
        <button className="cursor-pointer rounded-lg bg-zinc-800 px-8 py-4 hover:bg-zinc-700" onClick={handleClickLuck} type="button">Random</button>
      </div>
    </div>
      <div>
        {luckNumber % 2 === 0 ? (
          <p className="mb-4 flex items-center justify-center">{luckNumber}</p>
        ) : (
          <OddNumberComponent number={luckNumber} />
        )}
      </div>
    </div>
  );
}

