"use client";

import CaptchaNavigation from "@/components/CaptchaNaviguation";
import { useState, useEffect } from "react";

const OddNumberComponent = ({ number }: { number: number }) => {
  const [waitTime, setWaitTime] = useState(false);
  const [randomBoolean, setRandomBoolean] = useState<boolean>(false);

  useEffect(() => {
    setRandomBoolean(Boolean(Math.round(Math.random())));
    
    const timer = setTimeout(() => {
      setWaitTime(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!waitTime) {
    return (
      <div>
        <p className="mb-4 flex items-center justify-center font-bold text-2xl text-green-500">
          {number}
        </p>
        <p className="mb-4 flex items-center justify-center font-bold text-2xl text-green-500">
          Well done! You are a human.
        </p>
      </div>
    );
  }

  return (
    <div>
        {randomBoolean 
          ? (
            <div>
              <p className="mb-4 flex items-center justify-center font-bold text-2xl text-red-500">
                {number + 1}
              </p>
              <p className="mb-4 flex items-center justify-center text-2xl text-red-600">
                Oops, randomization had some delay. Try again !
              </p>
            </div>
          )
          : (
            <div>
              <p className="mb-4 flex items-center justify-center font-bold text-2xl text-green-500 ">
                {number}
              </p>
              <p className="mb-4 flex items-center justify-center font-bold text-2xl text-green-500">
                Well done! You are a human.
              </p>
              </div>
          )}
    </div>
  );
};

export default function OddCaptcha() {
  const [luckNumber, setLuckNumber] = useState(0);
  const [key, setKey] = useState(0);

  const handleClickLuck = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    setLuckNumber(randomNumber);
    setKey(prev => prev + 1);  };

  return (
    <div className="mb-4 flex h-screen flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-black">Human Verification</h1>
        <p className="mb-4 text-gray-600">You need to get an odd number to verify if you are human.</p>
        
        <div className="mb-6">
          <button 
            className="cursor-pointer rounded-lg bg-zinc-800 text-white px-8 py-4 hover:bg-zinc-700 transition-colors" 
            onClick={handleClickLuck} 
            type="button"
          >
            Generate Random Number
          </button>
        </div>
        
        <div className="min-h-[120px] flex flex-col justify-center">
          {luckNumber === 0 ? (
            <p className="text-gray-500">Click the button to start</p>
          ) : luckNumber % 2 === 0 ? (
            <div>
              <p className="mb-4 flex items-center justify-center font-bold text-2xl text-red-500">
                {luckNumber}
              </p>
              <p className="mb-4 flex items-center justify-center font-bold text-2xl text-red-500">
                Even number! You are not human. Try again.
              </p>
            </div>
          ) : (
            <OddNumberComponent key={key} number={luckNumber} />
          )}
        </div>
      </div>
      <CaptchaNavigation />
    </div>
  );
}
