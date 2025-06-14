"use client";

import { useState, useEffect } from "react";

const CalculCaptchaComponent = ({isCorrect}: {isCorrect: boolean}) => {
  return (
    <div>
      <p>
        {!isCorrect &&(
          "Result not quite precise. Try again!"
        )
        }
        {isCorrect &&(
          "Captcha successful! You are not a robot."
        )}
      </p>
    </div>
  );
}

export default function CalculCaptcha() {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [keysPressed, setKeysPressed] = useState(new Set<string>());
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keysPressed.has(e.key)) {
        e.preventDefault();
        return;
      }
      
      setKeysPressed(prev => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed]);

  const handleClick = () => {
    setSubmitted(true);
    if (response.length > 100)
      setIsCorrect(true);
    setResponse("");
  };

  return (
    <div className="mb-4 flex h-screen flex-col items-center justify-center">
      <p className="mb-4 flex items-center justify-center">Resolve this captcha</p>
      <div className="mb-4 flex w-fit items-center justify-center rounded-lg border-2 border-blue-200 border-solid p-4">
        "10 / 3 = ?"
      </div>
      <div className="mb-4 flex flex-col items-center justify-center space-y-4">
        <input
          type="text"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your response"
          className="w-full max-w-md border border-gray-300 px-3 py-2"
        />
        <button type="button" onClick={handleClick} className="mb-4 items-center justify-center rounded border border-gray-300 px-3 py-2" >Verify</button>
      </div>
      {submitted && (
        <div>
          <CalculCaptchaComponent isCorrect={isCorrect}/>
        </div>
      )}
    </div>
  );
}
